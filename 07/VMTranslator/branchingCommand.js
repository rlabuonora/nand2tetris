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
    }
};


module.exports = branchingCommand;
