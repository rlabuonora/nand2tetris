function CodeWriter() {
    this.fileName = "";
    this.labelCount = {};
    this.segmentCodes = { "local": "LCL", "argument": "ARG",
                          "this": "THIS", "that": "THAT" };

    this.commandType = function( str ) {
        var arithmeticCommands = ["add", "sub", "neg", "eq",
                                  "gt", "lt", "and", "or", "not"];

        if (arithmeticCommands.indexOf(str) >= 0) {
            return "C_ARITHMETIC";
        } else {
            var first = str.split(" ")[0];
            if (first === "push") return "C_PUSH";
            else if (first === "pop") return "C_POP";
        }
    };

    this.getLabel = function( str ) {

        var count = this.labelCount[str] === undefined ? 0 : this.labelCount[str];
        this.labelCount[str] = count+1;
        return {aCommand: "@" + str + "_" + (count), label: "(" + str + "_" + (count) + ")" };
 


    };

    this.arg1 = function( str ) {
        // throw error y C_RETURN
        var type = this.commandType(str);
        if ( type === "C_RETURN") throw Error;
        else if (type === "C_ARITHMETIC") return str;
        else {
            return str.split(" ")[1];
        }
    };

    this.arg2 = function( str ) {
        var type = this.commandType(str);
        if (!(type === "C_PUSH" || type === "C_POP" ||
              type === "C_FUNCTION" || type === "C_POP")) throw Error;
        else {
            return str.split(" ")[2];
        }
    };

    this.addOrSub = function( arg ) {
        var base = [
            "@SP","M=M-1", "@SP",
            "A=M","D=M","@SP",
            "M=M-1","A=M", "D=D+M",
            "@SP","A=M", "M=D",
            "@SP","M=M+1"];
        if(arg === "sub") base[4] = "D=-M";
        return base;

    };

    this.andOrOr = function( arg ) {
        var base = [
            "@SP", "M=M-1", "@SP",
            "A=M", "D=M", "@SP",
            "M=M-1", "@SP", "A=M",
            "D=D|M", "D=-D", "@SP",
            "A=M", "M=D", "@SP",
            "M=M+1"
        ];
        if (arg === "and") { base[9] = "D=D&M"; }
        return base;
    };

    this.not = function() {
        return ["@SP", "M=M-1", "@SP",
                "A=M","D=!M", "@SP",
                "A=M","M=D", "@SP",
                "M=M+1"]
    };

    this.neg = function() {
        return [
            "@SP", "M=M-1", "A=M",
            "D=-M", "@SP", "A=M",
            "M=D", "@SP", "M=M+1"
        ];
    };
    this.eq = function() {
        var neqLabel = this.getLabel("NEQ");
        var endLabel = this.getLabel("END");
        return [
            "@SP", "M=M-1", "@SP",
            "A=M", "D=M", "@SP",
            "M=M-1", "@SP", "A=M",
            "D=D-M",
            neqLabel.aCommand,
            "D;JNE",
            "@0", "D=A", "@SP",
            "A=M", "M=D", "@SP",
            "M=M+1",
            endLabel.aCommand,
            "0;JMP",
            neqLabel.label,
            "@-1", "D=A",
            "@SP", "A=M", "M=D",
            "@SP", "M=M+1",
            endLabel.label
        ];
    };
    this.ltGt = function( arg ) {
        var base = [
            "@SP", "M=M-1", "@SP",
            "A=M", "D=M", "@SP",
            "M=M-1", "@SP", "A=M",
            "D=M-D ", "@TRUE_0", "D;JGT ",
            "@SP", "A=M", "M=0",
            "@SP", "M=M+1", "@END_0",
            "0;JMP", "(TRUE_0)", "@SP",
            "A=M", "M=-1", "@SP",
            "M=M+1", "(END_0)"
        ];
        if (arg==="lt") base[11] = "D;JLT";
        return base;
    };

    this.writeArithmetic = function( vmCommand ) {
        var arg1 = this.arg1( vmCommand);
        if (arg1 === "add" || arg1 === "sub") {
            return this.addOrSub( arg1 );
        }
        else if (arg1 === "and" || arg1 === "or" ) {
            return this.andOrOr( arg1 );
        }
        else if (arg1 === "lt" || arg1 === "gt" ) {
            return this.ltGt( arg1 );
        }
        else if (arg1 === "not") {
            return this.not();
        }
        else if (arg1 === "neg") {
            return this.neg();
        }
        else if (arg1 === "eq") {
            return this.eq();
        }
    };

    this.popSegment = function(segment, offset) {
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
    };

    this.pushConstant = function( constant) {
        return ["@" + constant, "D=A", "@SP", "A=M", "M=D", "@SP", "M=M+1"];
    };

    this.pushSegment = function( segment, offset) {

        var firstPart;
        if (segment === "temp") {
            firstPart = ["@" + (5+parseInt(offset))];

        } else {
            var segment = this.segmentCodes[segment];
            firstPart =  ["@" + offset, "D=A", "@" + segment, "A=D+M"]
        }
        var secondPart = ["D=M", "@SP", "A=M", "M=D", "@SP", "M=M+1"];
        return  firstPart.concat(secondPart);
    };
    this.writeAssembly = function( vmCommand ) {
        // translates a single command from
        // vm code to an array of assembler commands
        var type = this.commandType( vmCommand );
        if (type === "C_PUSH" || type === "C_POP") return this.writePushPop( vmCommand );
        else if (type === "C_ARITHMETIC") return this.writeArithmetic( vmCommand );
    };

    this.writePushPop = function( vmCommand ) {
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
    };
}


module.exports = CodeWriter;
