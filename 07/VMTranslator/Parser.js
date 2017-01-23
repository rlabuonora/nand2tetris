// parses file and returns array
// of instructions (without comments or whitespace)
function Parser( file ) {

    this.commands;

    this.preprocessLine =  function( str ) {
        var re = /\/\/.*\r/;
        var newLine = str.replace(re, "").trim();
        return newLine;
    };

    this.readFile = function( file ) {
        // return an array with the lines of the file
        var fs = require('fs');
        return fs.readFileSync(file).toString().split("\n").slice(0, -1); // remove last blank line
    };

    this.preprocessFile = function( file ) {
        var arr = this.readFile(file);
        return arr.map(function(line) {
            return this.preprocessLine(line)
        }.bind(this)).filter(function(line) {
            return line !== "";
        });
    };

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
    if ( arguments.length > 0 ) {
        this.commands = this.preprocessFile( file );
    } else {
        this.commands = [];
    }
};

module.exports = Parser;
