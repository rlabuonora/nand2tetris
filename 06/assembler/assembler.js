var code = require('./code.js');
var parser = require('./parser.js');

var assembler = {
    translateCCommand: function(str) {
        var compMemonic = parser.comp(str);
        var destMemonic = parser.dest(str);
        var jumpMemonic = parser.jump(str);
        return "111" + code.comp(compMemonic) + code.dest(destMemonic) + code.jump(jumpMemonic);
    },
    translateACommand: function(str) {
        var decimal = parser.symbol(str) * 1; // coerce to Number
        return ("0000000000000000" + decimal.toString(2)).slice(-16);
    },
    translateInstruction: function(str) { // get command type and forward to function
        var type = parser.commandType(str);
        if (type==="C_COMMAND") {
            return this.translateCCommand(str);
        } else { // A_INSTRUCTION
            return this.translateACommand(str);
        }
    },
    translateFile: function(file) { // returns an array of binary instructions
        var arr = parser.preprocessFile(file);
        var binary = arr.map(function(instruction) {
            return this.translateInstruction(instruction);
        }.bind(this));
        return binary;
    }

    
}
// translate symbol less programs
module.exports = assembler;
