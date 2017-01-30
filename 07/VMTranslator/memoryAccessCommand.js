var memoryAccessCommand = {
    segmentCodes: { "local": "LCL", "argument": "ARG",
                    "this": "THIS", "that": "THAT" },
    popPointerThat: function() {
        return base = ["@SP", "M=M-1",
                    "A=M", "D=M",
                    "@THAT", "M=D" ];
    },

    popPointerThis: function() {
        var base = this.popPointerThat();
        base[4] = "@THIS";
        return base;
    },
    popStatic: function( segment, offset, fileName) {
        var base = this.popPointerThat();
        base[4] = "@"  + fileName + "." + offset;
    },

    popSegment: function( segment, offset ) {
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

        return firstPart.concat( secondPart );
    },

    pushConstant: function( constant ) {
        return ["@" + constant, "D=A", "@SP", "A=M", "M=D", "@SP", "M=M+1"];
    },

    pushSegment: function( segment, offset) {

        var firstPart;
        if (segment === "temp") {
            firstPart = ["@" + (5+parseInt(offset))];

        }
        else if (segment == "static" ) {
            firstPart = ["@" + this.fileName + "." + offset];
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
        var secondPart = ["D=M", "@SP", "A=M", "M=D", "@SP", "M=M+1"];
        return  firstPart.concat(secondPart);
    }
}


module.exports = memoryAccessCommand;
