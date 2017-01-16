var assert = require('assert');
var parser = require('../parser.js');


describe('Regular expression', function() {

    describe('removing comments', function() {

        var re = /\/\/.*\r/;

        it('full line comment', function() {
            var str = "// this is a comment\r";
            assert.equal(str.replace(re, ""), "");
        });
        it('a comment after an instruction', function() {
            var str = "ADD 1 + 2 // this is a comment\r";
            assert.equal(str.replace(re, ""), "ADD 1 + 2 ");
        });
    });
});

describe('Removing whitespace', function() {

    it('blank line', function() {
        var str = "      \r";
        assert.equal(str.trim(), "");
    });

    it('Leading whitespace', function() {
        var str = "   ADD 1 + 2\r";
        assert.equal(str.trim(), "ADD 1 + 2");
    });

    it('Trailing whitespace', function() {
        var str = "ADD 1 + 2    \r";
        assert.equal(str.trim(), "ADD 1 + 2");
    });

    it('Leading & trailing whitespace', function() {
        var str = "   ADD 1 + 2    \r";
        assert.equal(str.trim(), "ADD 1 + 2");
    });

    it('line with carriage return', function() {
        var str = "   ADD 1 + 2\r";
        assert.equal(str.trim(), "ADD 1 + 2");
    });describe('Removing whitespace and comments', function() {

        it('an empty line', function() {
            var str = "\r";
            assert.equal(parser.preprocessLine(str), "");
        });

        it('a blank line', function() {
            var str = "      \r";
            assert.equal(parser.preprocessLine(str), "");
        });

        it('an instruction ', function() {
            var str = "ADD 1 + 2\r";
            assert.equal(parser.preprocessLine(str), "ADD 1 + 2");
        });


        it('an instruction with a comment', function() {
            var str = "ADD 1 + 2  // This is a comment\r";
            assert.equal(parser.preprocessLine(str), "ADD 1 + 2");
        });

        it('a comment', function() {
            var str = "// This is a comment\r";
            assert.equal(parser.preprocessLine(str), "");
        });
    });


    describe("Reading a file", function() {
        it('reads the file', function() {
            var lines = parser.readFile('../add/Add.asm');
            var first = "// This file is part of www.nand2tetris.org\r"
            assert.equal(lines.length, 13);
            assert.equal(lines[0], first);
        });
    });


    describe("A collection of lines", function() {
        it("preprocess", function() {
            var path = '../max/Max.asm';
            var lines = parser.preprocessFile(path);
            assert.equal(lines[0], "@R0");
            assert.equal(lines[1], "D=M");

        });
    });
});


describe('Removing whitespace and comments', function() {

    it('an empty line', function() {
        var str = "\r";
        assert.equal(parser.preprocessLine(str), "");
    });

    it('a blank line', function() {
        var str = "      \r";
        assert.equal(parser.preprocessLine(str), "");
    });

    it('an instruction ', function() {
        var str = "ADD 1 + 2\r";
        assert.equal(parser.preprocessLine(str), "ADD 1 + 2");
    });


    it('an instruction with a comment', function() {
        var str = "ADD 1 + 2  // This is a comment\r";
        assert.equal(parser.preprocessLine(str), "ADD 1 + 2");
    });

    it('a comment', function() {
        var str = "// This is a comment\r";
        assert.equal(parser.preprocessLine(str), "");
    });
});


describe("Reading a file", function() {
    it('reads the file', function() {
        var lines = parser.readFile('../add/Add.asm');
        var first = "// This file is part of www.nand2tetris.org\r"
        assert.equal(lines.length, 13);
        assert.equal(lines[0], first);
    });
});


describe("A collection of lines", function() {
    it("preprocess", function() {
        var path = '../max/Max.asm';
        var lines = parser.preprocessFile(path);
        assert.equal(lines[0], "@R0");
        assert.equal(lines[1], "D=M");

    });
});

describe("Command Type", function() {
    it("A Command", function() {
        assert.equal(parser.commandType("@R0"), "A_COMMAND");
    });
    it("C Command", function() {
        assert.equal(parser.commandType("D=M"), "C_COMMAND");
        assert.equal(parser.commandType("0;JPM"), "C_COMMAND");
    });
    it("L Command", function() {
        assert.equal(parser.commandType("(LOOP)"), "L_COMMAND");
    });

    describe("Integration test", function() {
        it('a command', function() {

            assert.equal(parser.commandType(parser.preprocessFile('../add/Add.asm')[0]), "A_COMMAND");
        });


        it("c command", function() {
            assert.equal(parser.commandType(parser.preprocessFile('../add/Add.asm')[1]), "C_COMMAND");
        });

        it("l command", function() {

            assert.equal(parser.commandType(parser.preprocessFile('../max/Max.asm')[10]), "L_COMMAND");
        });

    });

    describe('symbol', function() {

        // throws and exception when called with a non-a instruction
        it("throws error when called with non-a instruction", function() {
            assert.throws(function() { parser.symbol("M=D") }, "Error");
        });
        it("returns the symbol of an a instruction", function() {
            assert.equal(parser.symbol("@42"), 42);
        });
        it("returns the symbol of an a instruction", function() {
            assert.equal(parser.symbol("@loop"), "loop");
        });


    });
    describe('dest', function() {

        // throws and exception when called with a non-a instruction
        it("returns the dest memonic", function() {
            
            assert.equal(parser.dest("D=M"), "D");
        });

        it("return null when no dest memonic", function() {
            
            assert(parser.dest("M")==null);
            assert(parser.dest("0;JPM")==null);
        });
    });
    describe('comp', function() {

        // throws and exception when called with a non-a instruction
        it("when dest and jmp are present", function() {
            assert.equal(parser.comp("D=D-M;JPM"), "D-M")
            
        });
        it("when only dest present", function() {
            assert.equal(parser.comp("D=D-M"), "D-M")
            
        });

        it("when only jmp is present", function() {
            assert.equal(parser.comp("D-M;JPM"), "D-M")
        });

        it("when only comp is present", function() {
            assert.equal(parser.comp("D-M"), "D-M")
        });
    });
    describe('JMP', function() {

        // throws and exception when called with a non-a instruction
        it("returns the jump memonic with dest", function() {
            
            assert.equal(parser.jump("D=M;JNG"), "JNG");
        });

        it("returns the jump memonic when no dest", function() {
            
            assert.equal(parser.jump("0;JMP"), "JMP");
        });

        it("return null when no jump memonic", function() {
            
            assert(parser.jump("M")==null);
            assert(parser.jump("D=M")==null);
        });
    });
});


// 1 is A_COMMAND
// 2 is C_COMMAND
// 7 is C_COMMAND
