var command = {
    commandType: function( str ) {
        var arithmeticCommands = ["add", "sub", "neg", "eq",
                                  "gt", "lt", "and", "or", "not"];

        if (arithmeticCommands.indexOf(str) >= 0) {
            return "C_ARITHMETIC";

        } else {
            var first = str.split(" ")[0];
            if (first === "push") return "C_PUSH";
            else if (first === "if-goto") return "C_IF";
            else if (first === "goto") return "C_GOTO";
            else if (first === "label") return "C_LABEL";
            else if (first === "pop") return "C_POP";
            else if (first === "return") return "C_RETURN";
            else if (first === "call") return "C_CALL";
            else if (first === "function") return "C_FUNCTION";
        }
    },
    arg1: function( str ) {
        // throw error y C_RETURN
        var type = this.commandType(str);
        if ( type === "C_RETURN") throw Error;
        else if (type === "C_ARITHMETIC") return str;
        else {
            return str.split(" ")[1];
        }
    },
    arg2: function( str ) {
        var type = this.commandType(str);
        if (!(type === "C_PUSH" || type === "C_POP" ||
              type === "C_FUNCTION" || type === "C_POP" ||
              type === "C_CALL" )) throw Error;
        else {
            return str.split(" ")[2];
        }
    }
};


module.exports = command;
