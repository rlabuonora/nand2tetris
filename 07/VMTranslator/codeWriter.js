var Parser = require('./Parser');
var parser = new Parser();

var codeWriter = {
    fileName: "",
    
    writeArithmetic( vmCommand ) {

    },

    writePushPop( vmCommand ) {

    },

    writeAssembly( vmCommand ) {
        // translates a single command from
        // vm code to an array of assembler commands
        return parser.commandType( vmCommand );
    }
}


module.exports = codeWriter;
