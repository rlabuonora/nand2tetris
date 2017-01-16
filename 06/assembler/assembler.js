var code = require('./code.js');
var parser = require('./parser.js');


var assembler = {
    translate: function(str) {
        var type = parser.commandType(str);
        if (type==="C_COMMAND") {
            var compMemonic = parser.comp(str);
            var destMemonic = parser.dest(str);
            var jumpMemonic = parser.jump(str);
            return "111" + code.comp(compMemonic) + code.dest(destMemonic) + code.jump(jumpMemonic);
        } else { // A_INSTRUCTION
            var decimal = parser.symbol(str) * 1; // coerce to Number
            return ("0000000000000000" + decimal.toString(2)).slice(-16);
        }
            
        
    }
}
// translate symbol less programs
module.exports = assembler;
