var parser = require('./parser');

function SymbolTable( instructions ) {

    this.symbols =   {
        "R0": "0", "R1": "1", "R2": "2", "R3": "3",
        "R4": "4", "R5": "5", "R6": "6", "R7": "7",
        "R8": "8", "R9": "9", "R10": "10", "R11": "11",
        "R12": "12", "R13": "13", "R14": "14", "R15": "15",
        "SCREEN": "16384", "KBD": "24576", "SP":"0", "LCL": "1",
        "ARG": "2", "THIS": "3", "THAT":"4"
    };

    this.contains = function(symbol) {
        return !(this.symbols[symbol]===undefined);
    };

    this.getAddress = function(symbol) {
        return this.symbols[symbol];
    };

    this.addEntry =  function(symbol, address) {
        this.symbols[symbol] = address;
    };

    this.buildLabels = function(instructions) {
        var rom=0;
        for (var i = 0; i < instructions.length; i++) {
            var type = parser.commandType(instructions[i]);
            if (type === "L_COMMAND") {
                this.addEntry(instructions[i].substr(1, instructions[i].length-2), rom.toString());
            } else {
                rom++;
            }

        }
    };
    this.buildVariables = function(instructions) {
        var ram=16;
        for (var i = 0; i < instructions.length; i++) {
            var type = parser.commandType(instructions[i]);
            if (type=="A_COMMAND") {
                var symbol = parser.symbol(instructions[i]);
                if (!symbol[0].match(/\d+/) && !this.contains(symbol)) {
                    // only if the first letter of the symbol is not a number
                    // pong uses variable names: math.0, etc.
                    // and the symbol is not on the table
                    this.addEntry(symbol, ram.toString());
                    ram++;
                }
            }
        };
    };

    this.buildLabels(instructions);
    this.buildVariables(instructions);

}

module.exports = SymbolTable;
