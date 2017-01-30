var command = require('./command');
var arithmeticCommand = require('./arithmeticCommand');

function CodeWriter() {
    this.fileName = "";
    this.labelCount = {};
    this.segmentCodes = { "local": "LCL", "argument": "ARG",
                          "this": "THIS", "that": "THAT" };

    this.getLabel = function( str ) {

        var count = this.labelCount[str] === undefined ? 0
                : this.labelCount[str];
        this.labelCount[str] = count+1;
        return {aCommand: "@" + str + "_" +
                (count), label: "(" + str + "_" + (count) + ")" };
    };




    this.writeArithmetic = function( vmCommand ) {
        var arg1 = command.arg1( vmCommand);
        if (arg1 === "add" || arg1 === "sub") {
            return arithmeticCommand.addOrSub( arg1 );
        }
        else if (arg1 === "and" || arg1 === "or" ) {
            return arithmeticCommand.andOrOr( arg1 );
        }
        else if (arg1 === "lt" || arg1 === "gt" ) {
            var trueLabel = this.getLabel("TRUE");
            var endLabel = this.getLabel("END");
            return arithmeticCommand.ltGt( arg1, trueLabel, endLabel);
        }
        else if (arg1 === "not") {
            return arithmeticCommand.not();
        }
        else if (arg1 === "neg") {
            return arithmeticCommand.neg();
        }
        else if (arg1 === "eq") {
            var neqLabel = this.getLabel("NEQ");
            var endLabel = this.getLabel("END");
            return arithmeticCommand.eq(neqLabel, endLabel);
        }
    };

    this.popPointerThis = function() {
        var base = this.popPointerThat();
        base[4] = "@THIS";
        return base;
    };

    this.popPointerThat = function() {
        return ["@SP", "M=M-1",
                "A=M", "D=M",
                "@THAT", "M=D" ];
    };

    this.popStatic = function( offset, fileName ) {
        var base = this.popPointerThat();
        base[4] = "@"  + fileName + "." + offset;
        return base;
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
    };

    this.writeAssembly = function( vmCommand ) {
        // translates a single command from
        // vm code to an array of assembler commands
        var result = ["// " + vmCommand];
        var type = command.commandType( vmCommand );
        if (type === "C_PUSH" || type === "C_POP") {
            result = result.concat(this.writePushPop( vmCommand ));
        }
        else if (type === "C_ARITHMETIC") {
            result = result.concat(this.writeArithmetic( vmCommand ));
        }
        return result;
    };

    this.writePushPop = function( vmCommand ) {
        var type = command.commandType( vmCommand );
        if (type === "C_PUSH") {
            var segment = command.arg1( vmCommand);
            if (segment === "constant") {
                var constant = command.arg2( vmCommand );
                return this.pushConstant( constant  );
            } else {
                var segment = command.arg1( vmCommand );
                var offset = command.arg2( vmCommand );
                return this.pushSegment(segment, offset);
            }
        }
        else if (type === "C_POP") {
            var segment = command.arg1( vmCommand);
            var offset = command.arg2( vmCommand );
            
            if (segment === "pointer") {
                if (offset === "0") return this.popPointerThis();
                else if (offset === "1") return this.popPointerThat();
            }
            else if (segment === "static") {
                return this.popStatic( offset, this.fileName );
            }
            else {
                return this.popSegment( segment, offset );
            }
        }
    };
}

module.exports = CodeWriter;
