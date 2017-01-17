var assert = require('assert');
var symbolTable = require('../symbolTable.js');
var parser = require('../parser.js')

describe('Symbol Table', function() {


    describe('Variables with dots', function() {
        it("Rect.asm", function() {
            var instructions = parser.preprocessFile('../rect/RectVars.asm');
            symbolTable.build(instructions);
            console.log(symbolTable.symbols);
            assert(symbolTable.contains("counter"));
            assert(symbolTable.contains("address.0"));
            assert.equal(symbolTable.getAddress("counter"), "16");
            assert.equal(symbolTable.getAddress("address.0"), "17");
        });
    });
    
    
});
