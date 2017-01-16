var parser = {
    preprocessLine:  function(str) {
        var re = /\/\/.*\r/;
        var newLine = str.replace(re, "").trim();
        return newLine;
    },

    readFile: function(file) {
        // return an array with the lines of the file
        var fs = require('fs');
        return fs.readFileSync(file).toString().split("\n").slice(0, -1); // remove last blank line
    },

    preprocessFile:  function(file) {
        var arr = this.readFile(file);
        return arr.map(function(line) {
            return this.preprocessLine(line)
        }.bind(this)).filter(function(line) {
            return line !== "";
        });
    },

    commandType: function(str) {
        if (str[0] === '@') return "A_COMMAND";
        else if (str[0] === '(') return "L_COMMAND"
        else return "C_COMMAND";  //
    },
    symbol: function(str) {
        if (this.commandType(str)!="A_COMMAND") throw "Error";
        return str.substr(1, str.length-1);
    },
    dest: function(str) {
        if (this.commandType(str) != "C_COMMAND") throw "Error";
        var eq = str.indexOf("=");
        if (eq < 0) return null;
        else {
            return str.substr(0, eq);
        }
    },
    comp: function(str) {
        if (this.commandType(str) != "C_COMMAND") throw "Error";
        var eq = str.indexOf("=");
        var semicol = str.indexOf(";");
        var n = str.length;
        if (eq > 0 && semicol > 0) {
            return str.substr(eq+1, semicol-eq-1);
        } else if (semicol < 0 && eq > 0) {
            return str.substr(eq+1, n-eq-1);
        } else if (semicol > 0 && eq < 0) {
            return str.substr(0, semicol);
        } else {
            return str;
        }
    },
    jump: function(str) {
        if (this.commandType(str) != "C_COMMAND") throw "Error";
        var semicol = str.indexOf(";");
        if (semicol < 0) return null;
        else {
            return str.substr(semicol+1, str.length-1);
        }
    }
};

module.exports = parser;
