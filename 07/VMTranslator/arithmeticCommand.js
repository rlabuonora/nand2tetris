var arithmeticCommand = {
    addOrSub: function( arg ) {
        var base = [
            "@SP","M=M-1", "@SP",
            "A=M","D=M","@SP",
            "M=M-1","A=M", "D=D+M",
            "@SP","A=M", "M=D",
            "@SP","M=M+1"];
        if(arg === "sub") base[4] = "D=-M";
        return base;

    },

    andOrOr: function( arg ) {
        var base = [
            "@SP", "M=M-1", "@SP",
            "A=M", "D=M", "@SP",
            "M=M-1", "@SP", "A=M",
            "D=D|M","@SP",
            "A=M", "M=D", "@SP",
            "M=M+1"
        ];
        if (arg === "and") { base[9] = "D=D&M"; }
        return base;
    },

    not: function() {
        return ["@SP", "M=M-1", "@SP",
                "A=M","D=!M", "@SP",
                "A=M","M=D", "@SP",
                "M=M+1"]
    },

    neg: function() {
        return [
            "@SP", "M=M-1", "@SP", "A=M",
            "D=-M", "@SP", "A=M",
            "M=D", "@SP", "M=M+1"
        ];
    },
    eq: function(neqLabel, endLabel) {
        
        return [
            "@SP", "M=M-1", "@SP",
            "A=M", "D=M", "@SP",
            "M=M-1", "@SP", "A=M",
            "D=D-M",
            neqLabel.aCommand,
            "D;JNE",
            "D=-1", "@SP",
            "A=M", "M=D", "@SP",
            "M=M+1",
            endLabel.aCommand,
            "0;JMP",
            neqLabel.label,
            "D=0",
            "@SP", "A=M", "M=D",
            "@SP", "M=M+1",
            endLabel.label
        ];
    },
    ltGt: function( arg, trueLabel, endLabel ) {
        var base = [
            "@SP", "M=M-1", "@SP",
            "A=M", "D=M", "@SP",
            "M=M-1", "@SP", "A=M",
            "D=M-D ",
            trueLabel.aCommand,
            "D;JGT ",
            "@SP", "A=M", "M=0",
            "@SP", "M=M+1",
            endLabel.aCommand,
            "0;JMP",
            trueLabel.label,
            "@SP",
            "A=M", "M=-1", "@SP",
            "M=M+1",
            endLabel.label
        ];
        if (arg==="lt") base[11] = "D;JLT";
        return base;
    }
};

module.exports = arithmeticCommand;
