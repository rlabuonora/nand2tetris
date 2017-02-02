var code = require('./code');
var parser = require('./parser');
var SymbolTable = require('./SymbolTable');
fs = require('fs');
path = require('path');

function Assembler( file )  {
    this.translateCCommand = function(str) {
        var compMemonic = parser.comp(str);
        var destMemonic = parser.dest(str);
        var jumpMemonic = parser.jump(str);
        return "111" + code.comp(compMemonic) + code.dest(destMemonic) + code.jump(jumpMemonic);
    };
    this.translateACommand = function(str, symbolTable) {
        var symbol = parser.symbol(str);
        if (symbolTable.contains(symbol)) {
            decimal = symbolTable.getAddress(symbol) * 1; // coerce to Number
        } else {
            var decimal = parser.symbol(str) * 1; // coerce to Number
        }

        return ("0000000000000000" + decimal.toString(2)).slice(-16);
    };
    this.translateInstruction =  function(str, symbolTable) { // get command type and forward to function
        
        var type = parser.commandType(str);
        if (type==="C_COMMAND") {
            return this.translateCCommand(str);
        } else { // A_INSTRUCTION
            return this.translateACommand(str, symbolTable);
        }
    };
    this.translateFile = function( file ) { // returns an array of binary instructions
        this.destination = this.getDestination( file );
        var instructions = parser.preprocessFile( file );
        var symbolTable = new SymbolTable( instructions );
        // remove labels
        var instructions = instructions.filter(function(line) {
            return line[0] !== "(";
        });
        
        var binary = instructions.map(function(instruction) {
            return this.translateInstruction(instruction, symbolTable);
        }.bind(this));
        return binary;
    };
    this.saveToFile = function( binaryInstructions, destination ) {
        var str = binaryInstructions.join("\n") + "\n";
        fs.writeFile(destination, str , function (err) {
            if (err) return console.log(err);
        });        
    }
    this.getDestination = function( file ) {
        var dirname = path.dirname(file);
        var filename = path.basename(file, '.asm');
        return dirname + "/" + "My" + filename + ".hack";
    };
    var binaryInstructions = this.translateFile( file );
    this.saveToFile(binaryInstructions, this.getDestination( file )); // TODO fix API for saving to file
}

if (require.main === module) {
    var args =process.argv.slice(2);
    var assembler = new Assembler( args[0] );
    // assembler.save();
} else {
    module.exports = Assembler;
}


