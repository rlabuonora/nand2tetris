var codeWriter = {
    fileName: "",
    segmentCodes: { "local": "LCL", "argument": "ARG",
                    "this": "THIS", "that": "THAT" },
    commandType( str ) {
        var arithmeticCommands = ["add", "sub", "neg", "eq",
                                  "gt", "lt", "and", "or", "not"];

        if (arithmeticCommands.indexOf(str) >= 0) {
            return "C_ARITHMETIC";
        } else {
            var first = str.split(" ")[0];
            if (first === "push") return "C_PUSH";
            else if (first === "pop") return "C_POP";
        }
    },

    arg1( str ) {
        // throw error y C_RETURN
        var type = this.commandType(str);
        if ( type === "C_RETURN") throw Error;
        else if (type === "C_ARITHMETIC") return str;
        else {
            return str.split(" ")[1];
        }
    },

    arg2( str ) {
        var type = this.commandType(str);
        if (!(type === "C_PUSH" || type === "C_POP" ||
              type === "C_FUNCTION" || type === "C_POP")) throw Error;
        else {
            return str.split(" ")[2];
        }
    },

    addOrSub( arg ) {
        var base = [
            "@SP","M=M-1", "@SP",
            "A=M","D=M","@SP",
            "M=M-1","A=M", "D=D+M",
            "@SP","A=M", "M=D",
            "@SP","M=M+1"];
        if(arg === "sub") base[4] = "D=-M";
        return base;

    },

    writeArithmetic( vmCommand ) {
        var arg1 = this.arg1( vmCommand);
        if (arg1 === "add" || arg1 == "sub") {
            return this.addOrSub( arg1 );
        }
    },

    popSegment(segment, offset) {
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

    pushConstant( constant) {
        return ["@" + constant, "D=A", "@SP", "A=M", "M=D", "@SP", "M=M+1"];
    },

    pushSegment( segment, offset) {

        var firstPart;
        if (segment === "temp") {
            firstPart = ["@" + (5+parseInt(offset))];

        } else {
            var segment = this.segmentCodes[segment];
            firstPart =  ["@" + offset, "D=A", "@" + segment, "A=D+M"]
        }
        var secondPart = ["D=M", "@SP", "A=M", "M=D", "@SP", "M=M+1"];
        return  firstPart.concat(secondPart);


    },
    writeAssembly( vmCommand ) {
        // translates a single command from
        // vm code to an array of assembler commands
        var type = this.commandType( vmCommand );
        if (type === "C_PUSH" || type === "C_POP") return this.writePushPop( vmCommand );
        else if (type === "C_ARITHMETIC") return this.writeArithmetic( vmCommand );
    },

    writePushPop( vmCommand ) {
        var type = this.commandType( vmCommand );
        if (type === "C_PUSH") {
            var segment = this.arg1( vmCommand);
            if (segment === "constant") {
                var constant = this.arg2( vmCommand );
                return this.pushConstant( constant  );
            } else {
                var segment = this.arg1( vmCommand );
                var offset = this.arg2( vmCommand );
                return this.pushSegment(segment, offset);
            }
        }
        else if (type === "C_POP") {
            var segment = this.arg1( vmCommand);
            var offset = this.arg2( vmCommand );
            return this.popSegment( segment, offset );
        }
    }
}


module.exports = codeWriter;
