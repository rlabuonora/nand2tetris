var command = require('./command');
var arithmeticCommand = require('./arithmeticCommand');
var memoryAccessCommand = require('./memoryAccessCommand');
var branchingCommand = require('./branchingCommand');

function CodeWriter() {
    this.fileName = "";
    this.labelCount = {};
    

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

    this.writePushPop = function( vmCommand ) {
        var type = command.commandType( vmCommand );
        if (type === "C_PUSH") {
            var segment = command.arg1( vmCommand);
            if (segment === "constant") {
                var constant = command.arg2( vmCommand );
                return memoryAccessCommand.pushConstant( constant  );
            } else if (segment === "static") {
                var offset = command.arg2( vmCommand );
                return memoryAccessCommand.pushStatic( offset, this.fileName );
            } else {
                var segment = command.arg1( vmCommand );
                var offset = command.arg2( vmCommand );
                return memoryAccessCommand.pushSegment(segment, offset);
            }
        }
        else if (type === "C_POP") {
            var segment = command.arg1( vmCommand);
            var offset = command.arg2( vmCommand );
            
            if (segment === "pointer") {
                if (offset === "0") return memoryAccessCommand.popPointerThis();
                else if (offset === "1") return memoryAccessCommand.popPointerThat();
            }
            else if (segment === "static") {
                return memoryAccessCommand.popStatic( offset, this.fileName );
            }
            else {
                return memoryAccessCommand.popSegment( segment, offset );
            }
        }
    };
    this.writeBranching = function( vmCommand ) {

        
        var type = command.commandType( vmCommand );
        if (type === "C_GOTO") {
            var label = command.arg1( vmCommand );
            return branchingCommand.goto( label );
        }
        else if (type === "C_IF") {
            var label = command.arg1( vmCommand );
            return branchingCommand.if( label );
        }
        else if (type === "C_LABEL") {
            var label = command.arg1( vmCommand );
            return branchingCommand.label( label );
        }
        else if (type === "C_FUNCTION") {
            var fName = command.arg1( vmCommand );
            var locals = command.arg2( vmCommand);
            this.currentFunction = fName;
            return branchingCommand.functionDeclaration( fName, locals, memoryAccessCommand.pushConstant  );
        }
        else if (type === "C_RETURN") {
            return branchingCommand.retr();
        }
        else if (type === "C_CALL") {
            var callee = command.arg1( vmCommand );
            var nArgs = command.arg2( vmCommand );
            var callerLabel = this.getLabel( this.currentFunction );
            return branchingCommand.cll(callee, nArgs, callerLabel );
        }

        
    }
    this.writeAssembly = function( vmCommand ) {
        // translates a single command from
        // vm code to an array of assembler commands
        // prepending the vm command as a comment 
        var result = ["// " + vmCommand];
        var type = command.commandType( vmCommand );
        if (type === "C_PUSH" || type === "C_POP") {
            result = result.concat(this.writePushPop( vmCommand ));
        }
        else if (type === "C_ARITHMETIC") {
            result = result.concat(this.writeArithmetic( vmCommand ));
        }
        else {
            result = result.concat(this.writeBranching( vmCommand ));
        }
        
     
        return result;
    };
}

module.exports = CodeWriter;
