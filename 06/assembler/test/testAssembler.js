var assert = require('assert');
var assembler = require('../assembler.js');


describe('Assembler', function() {

    describe('translates a file', function() {
        it("add.asm", function() {
            var actual = assembler.translateFile('../add/Add.asm');
            var expected = [
                "0000000000000010",
                "1110110000010000",
                "0000000000000011",
                "1110000010010000",
                "0000000000000000",
                "1110001100001000"
            ];
            assert.deepEqual(actual, expected);
        });
        it("max.asm", function() {
            var actual = assembler.translateFile('../max/MaxL.asm');
            var expected = [
                "0000000000000000",
                "1111110000010000",
                "0000000000000001",
                "1111010011010000",
                "0000000000001010",
                "1110001100000001",
                "0000000000000001",
                "1111110000010000",
                "0000000000001100",
                "1110101010000111",
                "0000000000000000",
                "1111110000010000", 
                "0000000000000010", 
                "1110001100001000",
                "0000000000001110",
                "1110101010000111"
            ];
            assert.deepEqual(actual, expected);
        });
    });
    describe('translates a single instruction', function() {
        it("a-instruction", function() {
            assert.equal(assembler.translateInstruction("@2"), "0000000000000010");
        });
        it("a-instruction", function() {
            assert.equal(assembler.translateInstruction("@3"), "0000000000000011");
        });
        it("c-instruction", function() {
            assert.equal(assembler.translateInstruction("D=A"), "1110110000010000");
            assert.equal(assembler.translateInstruction("D=D+A"), "1110000010010000");
            assert.equal(assembler.translateInstruction("M=D"), "1110001100001000");
            assert.equal(assembler.translateInstruction("D=D-M"), "1111010011010000");
            assert.equal(assembler.translateInstruction("D;JGT"), "1110001100000001");
            assert.equal(assembler.translateInstruction("0;JMP"), "1110101010000111");
        });
    });
});
