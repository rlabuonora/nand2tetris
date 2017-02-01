var branchingCommand = {
    goto: function( label ) {

        return [
            "@MAIN_LOOP_START",
            "0;JMP"
        ];
    },
    if: function( label ) {
        return [
            "@SP", "M=M-1",
            "A=M", "D=M",
            "@" + label,
            "D;JGT"
        ];
    },
    label: function( label ) {
        return [ "(" + label + ")" ];
    },
    functionDeclaration: function( fName, locals, pushConstant) {
        var result = this.label( fName );
        for (var i = 0; i < locals; i++) {
            result = result.concat(pushConstant(0));
        }
        return result;
    },
    retr: function() {
        return [
            "@LCL", "D=M", "@endFrame",
            "M=D",  "@endFrame", "D=M",
            "@5",  "A=D-A", "D=M",
            "@retAddr",  "M=D", "@SP",
            "M=M-1",  "A=M", "D=M",
            "@ARG",  "A=M", "M=D",
            "@ARG",  "D=M+1", "@SP",
            "M=D",  "@endFrame", "D=M",
            "@1",  "A=D-A", "D=M",
            "@THAT",  "M=D", "@endFrame",
            "D=M",  "@2", "A=D-A",
            "D=M",  "@THIS", "M=D",
            "@endFrame",  "D=M", "@3",
            "A=D-A",  "D=M", "@ARG",
            "M=D",  "@endFrame", "D=M",
            "@4",  "A=D-A", "D=M",
            "@LCL",  "M=D", "@retAddr",
            "A=M", "0;JMP"
        ];
    },
    cll: function( callee, nArgs, callerLabel) {
        return [
            callerLabel.aCommand,
            "D=A", "@SP", "A=M",
            "M=D", "@SP", "M=M+1",
            "@LCL", "D=M", "@SP",
            "A=M", "M=D", "@SP",
            "M=M+1", "@ARG", "D=M",
            "@SP", "A=M", "M=D",
            "@SP", "M=M+1", "@THIS",
            "D=M", "@SP", "A=M",
            "M=D", "@SP", "M=M+1",
            "@THAT", "D=M", "@SP",
            "A=M", "M=D", "@SP",
            "M=M+1", "@SP", "D=M",
            "@5", "D=D-A",
            "@" + nArgs, // should be n-args! CHANGE!!
            "D=D-A",  "@ARG", "M=D",
            "@SP", "D=M", "@LCL",
            "M=D",
            "@" + callee,
            "0;JMP",
            callerLabel.label
        ];
    }


};


module.exports = branchingCommand;
