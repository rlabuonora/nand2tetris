var assert = require('assert');
var Assembler = require('../Assembler');
var SymbolTable = require('../SymbolTable');


describe('Assembler', function() {

    describe('translates a file with symbols', function() {
        it("Max.asm", function() {
            var file = '../max/MaxL.asm';
            var actual = new Assembler(file).translateFile(file);
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
    it("Rect.asm", function() {
        var actual = new Assembler('../rect/Rect.asm').translateFile('../rect/Rect.asm');
        var expected = [
            "0000000000000000",
            "1111110000010000",
            "0000000000010111",
            "1110001100000110",
            "0000000000010000",
            "1110001100001000",
            "0100000000000000",
            "1110110000010000",
            "0000000000010001",
            "1110001100001000",
            "0000000000010001",
            "1111110000100000",
            "1110111010001000",
            "0000000000010001",
            "1111110000010000",
            "0000000000100000",
            "1110000010010000",
            "0000000000010001",
            "1110001100001000",
            "0000000000010000",
            "1111110010011000",
            "0000000000001010",
            "1110001100000001",
            "0000000000010111",
            "1110101010000111"
        ];
        assert.deepEqual(actual, expected);
    });
});

describe('translates a file with no symbols', function() {
    it("add.asm", function() {
        var actual = new Assembler('../add/Add.asm').translateFile('../add/Add.asm');
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
    it("MaxL.asm", function() {
        var actual = new Assembler('../max/MaxL.asm').translateFile('../max/MaxL.asm');
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
    it("Add.asm", function() {
        var actual = new Assembler('../add/Add.asm').translateFile('../add/Add.asm');
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
    it("RectL.asm", function() {
        var actual = new Assembler('../rect/RectL.asm').translateFile('../rect/RectL.asm');
        var expected = [
            "0000000000000000",
            "1111110000010000",
            "0000000000010111",
            "1110001100000110",
            "0000000000010000",
            "1110001100001000",
            "0100000000000000",
            "1110110000010000",
            "0000000000010001",
            "1110001100001000",
            "0000000000010001",
            "1111110000100000",
            "1110111010001000",
            "0000000000010001",
            "1111110000010000",
            "0000000000100000",
            "1110000010010000",
            "0000000000010001",
            "1110001100001000",
            "0000000000010000",
            "1111110010011000",
            "0000000000001010",
            "1110001100000001",
            "0000000000010111",
            "1110101010000111"
        ];
        assert.deepEqual(actual, expected);
    });
});

describe('translates a single instruction', function() {
    var assembler = new Assembler('../add/Add.asm');
    var symbolTable = new SymbolTable([]);
    
    it("a-instruction", function() {
        assert.equal(assembler.translateInstruction("@2", symbolTable), "0000000000000010");
    });
    it("a-instruction", function() {
        assert.equal(assembler.translateInstruction("@3", symbolTable), "0000000000000011");
    });
    it("c-instruction", function() {
        assert.equal(assembler.translateInstruction("D=A", symbolTable), "1110110000010000");
        assert.equal(assembler.translateInstruction("D=D+A", symbolTable), "1110000010010000");
        assert.equal(assembler.translateInstruction("M=D", symbolTable), "1110001100001000");
        assert.equal(assembler.translateInstruction("D=D-M", symbolTable), "1111010011010000");
        assert.equal(assembler.translateInstruction("D;JGT", symbolTable), "1110001100000001");
        assert.equal(assembler.translateInstruction("0;JMP", symbolTable), "1110101010000111");
    });
});
