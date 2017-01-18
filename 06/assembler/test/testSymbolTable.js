var assert = require('assert');
var SymbolTable = require('../SymbolTable.js');
var parser = require('../parser.js');

describe('Symbol Table', function() {
    var symbolTable = new SymbolTable( [] );
    
    it('has the predetermined symbols', function() {
        assert.equal(symbolTable.getAddress("R0"), "0");
    });

    it("adds entries", function() {
        symbolTable.addEntry("LOOP", "10");
        assert.equal(symbolTable.getAddress("LOOP"), "10");
        assert.equal(symbolTable.getAddress("WRONG"), undefined);
    });

    it("contains", function() {
        assert.equal(symbolTable.contains("WRONG"), false);
        assert.equal(symbolTable.contains("R1"), true);

    });
    
    describe('Labels', function() {
        it("Max.asm", function() {
            var instructions = parser.preprocessFile('../max/Max.asm');
            var symbolTable = new SymbolTable( instructions );
            assert(symbolTable.contains("OUTPUT_FIRST"));
            assert(symbolTable.contains("OUTPUT_D"));
            assert(symbolTable.contains("INFINITE_LOOP"));
            assert.equal(symbolTable.getAddress("OUTPUT_FIRST"), "10");
            assert.equal(symbolTable.getAddress("OUTPUT_D"), "12");
            assert.equal(symbolTable.getAddress("INFINITE_LOOP"), "14");
            assert.equal(symbolTable.getAddress("R0"), "0");
        });
    });
    describe('Variables', function() {
        it("Rect.asm", function() {
            var instructions = parser.preprocessFile('../rect/Rect.asm');
            var symbolTable = new SymbolTable( instructions );
            assert(symbolTable.contains("counter"));
            assert(symbolTable.contains("address"));
            assert(!symbolTable.contains("OUTPUT_FIRST"));
            assert.equal(symbolTable.getAddress("counter"), "16");
            assert.equal(symbolTable.getAddress("address"), "17");
        });
    });

    describe('Symbols with dots', function() {
        it("Rect.asm", function() {
            var instructions = parser.preprocessFile('../rect/RectVars.asm');
            symbolTable = new SymbolTable( instructions );
            assert(symbolTable.contains("counter"));
            assert(symbolTable.contains("address.0"));
            assert.equal(symbolTable.getAddress("counter"), "16");
            assert.equal(symbolTable.getAddress("address.0"), "17");
        });
    });
    
    
});
