var code = require('./code');
var parser = require('./parser');
var SymbolTable = require('./SymbolTable');
fs = require('fs');


var assembler = {
    translateCCommand: function(str) {
        var compMemonic = parser.comp(str);
        var destMemonic = parser.dest(str);
        var jumpMemonic = parser.jump(str);
        return "111" + code.comp(compMemonic) + code.dest(destMemonic) + code.jump(jumpMemonic);
    },
    translateACommand: function(str, symbolTable) {
        var symbol = parser.symbol(str);
        if (symbolTable.contains(symbol)) {
            decimal = symbolTable.getAddress(symbol) * 1; // coerce to Number
        } else {
            var decimal = parser.symbol(str) * 1; // coerce to Number
        }

        return ("0000000000000000" + decimal.toString(2)).slice(-16);
    },
    translateInstruction: function(str, symbolTable) { // get command type and forward to function
        
        var type = parser.commandType(str);
        if (type==="C_COMMAND") {
            return this.translateCCommand(str);
        } else { // A_INSTRUCTION
            return this.translateACommand(str, symbolTable);
        }
    },
    translateFile: function(file) { // returns an array of binary instructions
        var instructions = parser.preprocessFile(file);

        // build symbol table
        var symbolTable = new SymbolTable(instructions);
        // remove labels
        var instructions = instructions.filter(function(line) {
            return line[0] !== "(";
        });
        // get binary instructions
        var binary = instructions.map(function(instruction) {
            return this.translateInstruction(instruction, symbolTable);
        }.bind(this));

        // save them to file
        this.saveToFile(binary);
        return binary;
    },
    saveToFile(binaryInstructions) {
        var str = binaryInstructions.join("\r");
        fs.writeFile('output.hack', str , function (err) {
            if (err) return console.log(err);
        });        

    }
}

var args =process.argv.slice(2);

assembler.translateFile(args[0])
// translate symbol less programs
module.exports = assembler;


