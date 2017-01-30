var memoryAccessCommand = {
    segmentCodes: { "local": "LCL", "argument": "ARG",
                    "this": "THIS", "that": "THAT" },
    popPointerThis: function() {
        var base = memoryAccessCommand.popPointerThat();
        base[4] = "@THIS";
        return base;
    },

    popPointerThat: function() {
        return ["@SP", "M=M-1",
                "A=M", "D=M",
                "@THAT", "M=D" ];
    },

    popStatic: function( offset, fileName ) {
        var base = this.popPointerThat();
        base[4] = "@"  + fileName + "." + offset;
        return base;
    },
    popSegment: function(segment, offset) {
        if (segment === "temp") {
            var newOffset = 5 + parseInt(offset);
            var firstPart = ["@" + newOffset, "D=A"];
        } else {
            var segmentCode = this.segmentCodes[segment];
            var firstPart = ["@" + offset, "D=A", "@" + segmentCode, "D=D+M"];
        }
        var secondPart =  [ "@addr", "M=D",
                            "@SP", "M=M-1", "@SP",
                            "A=M", "D=M", "@addr",
                            "A=M", "M=D"];

        return firstPart.concat(secondPart);
    },

    pushConstant: function( constant) {
        return ["@" + constant, "D=A", "@SP", "A=M", "M=D", "@SP", "M=M+1"];
    },

    pushStatic: function( offset, fileName ) {
        var firstPart = ["@" + fileName + "." + offset];
        var secondPart = this.tail();
        return firstPart.concat(secondPart);
    },

    pushSegment: function( segment, offset) {

        var firstPart;
        if (segment === "temp") {
            firstPart = ["@" + (5+parseInt(offset))];

        }
        else if (segment === "pointer" ) {
            if (offset === "1") {
                firstPart = ["@THAT"];
            } else if ( offset === "0" ) {
                firstPart = ["@THIS"];
            }

        }
        else {
            var segment = this.segmentCodes[segment];
            firstPart =  ["@" + offset, "D=A", "@" + segment, "A=D+M"]
        }
        var secondPart = this.tail();
        return  firstPart.concat(secondPart);
    },
    tail: function() {
        return ["D=M", "@SP", "A=M", "M=D", "@SP", "M=M+1"];
    }
};



module.exports = memoryAccessCommand;
