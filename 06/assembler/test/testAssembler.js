var assert = require('assert');
var assembler = require('../assembler.js');


describe('Assembler', function() {
    describe('translates a single instruction', function() {
        it("a-instruction", function() {
            assert.equal(assembler.translate("@2"), "0000000000000010");
        });
        it("a-instruction", function() {
            assert.equal(assembler.translate("@3"), "0000000000000011");
        });
        it("c-instruction", function() {
            assert.equal(assembler.translate("D=A"), "1110110000010000");
            assert.equal(assembler.translate("D=D+A"), "1110000010010000");
            assert.equal(assembler.translate("M=D"), "1110001100001000");
            assert.equal(assembler.translate("D=D-M"), "1111010011010000");
            assert.equal(assembler.translate("D;JGT"), "1110001100000001");
            assert.equal(assembler.translate("0;JMP"), "1110101010000111");
            
        });
    });
});
