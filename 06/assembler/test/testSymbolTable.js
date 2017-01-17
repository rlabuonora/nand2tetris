var assert = require('assert');
var symbolTable = require('../symbolTable.js');


describe('Symbol Table', function() {

    // it('has the predetermined symbols', function() {
    //     assert.equal(symbolTable.getAddress("R0"), "0");
    // });

    // it("adds entries", function() {
    //     symbolTable.addEntry("LOOP", "10");
    //     assert.equal(symbolTable.getAddress("LOOP"), "10");
    //     assert.equal(symbolTable.getAddress("WRONG"), undefined);
    // });

    // it("contains", function() {

    //     assert.equal(symbolTable.contains("WRONG"), false);
    //     assert.equal(symbolTable.contains("R1"), true);

    // });

    describe('Labels', function() {
        it("max.asm", function() {
            symbolTable.buildFromFile('../max/Max.asm');
            assert(symbolTable.contains("OUTPUT_FIRST"));
            assert(symbolTable.contains("OUTPUT_D"));
            assert(symbolTable.contains("INFINITE_LOOP"));
            assert.equal(symbolTable.getAddress("OUTPUT_FIRST"), "10");
            assert.equal(symbolTable.getAddress("OUTPUT_D"), "12");
            assert.equal(symbolTable.getAddress("INFINITE_LOOP"), "14");
            assert.equal(symbolTable.getAddress("R0"), "0");
        });
    });
    // describe('Variables', function() {
    //     it("Rect.asm", function() {
    //         symbolTable.buildFromFile('../rect/Rect.asm');
    //         assert(symbolTable.contains("counter"));
    //         assert(symbolTable.contains("address"));
    //         assert.equal(symbolTable.getAddress("counter"), "16");
    //         assert.equal(symbolTable.getAddress("address"), "17");
    //     });
    // });
    
    
});
