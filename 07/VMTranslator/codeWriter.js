var codeWriter = {
    fileName: "",
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

    writeArithmetic( vmCommand ) {
        return ["arithmetic", "command"];
    },

    pushConstant( constant) {
        return ["@" + constant, "D=A", "@SP", "A=M", "M=D", "@SP", "M=M+1"];
    },

    pushSegment( segment, offset) {
        var segmentCodes = { "local": "LCL", "argument": "ARG",
                             "this": "THIS", "that": "THAT" };
        var firstPart;
        if (segment === "temp") {
            firstPart = ["@" + (5+parseInt(offset))];

        } else {
            var segment = segmentCodes[segment];
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
    }
}


module.exports = codeWriter;
