var assert = require('assert');
var Parser = require('../Parser');
var codeWriter = require('../codeWriter');

describe("Writing code", function() {
    it('setting filename', function() {
        codeWriter.fileName = "blabla.vm";
        assert.equal(codeWriter.fileName, "blabla.vm");
    })

    describe('pushing', function() {
        it('constant', function() {
            var actual = codeWriter.writeAssembly("push constant 10");
            var expected = [

            ];
        });
        it('push local', function() {
            var actual = codeWriter.writeAssembly("push local 0");
            var expected = [

            ];
        });
        it('that', function() {
            var actual = codeWriter.writeAssembly("push that 5");
            var expected = [

            ];
        });
        it('temp', function() {
            var actual = codeWriter.writeAssembly("push temp 6");
            var expected = [

            ];
        });
        it('this', function() {
            var actual = codeWriter.writeAssembly("push this 6");
            var expected = [

            ];
        });
    });
});

describe('args', function() {

    describe('Push', function() {
        it("arg1 of a C_PUSH", function() {
            var expected = "constant";
            var actual = codeWriter.arg1("push constant 10");
            assert.equal(expected, actual);
        });
        it("arg2 of a C_PUSH", function() {
            var expected = "10";
            var actual = codeWriter.arg2("push constant 10");
            assert.equal(expected, actual);
        });
    });
    describe('Pop', function() {
        it("arg1 of a C_POP", function() {
            var expected = "local";
            var actual = codeWriter.arg1("pop local 0");
            assert.equal(expected, actual);
        });
        it("arg2 of a C_POP", function() {
            var expected = "0";
            var actual = codeWriter.arg2("pop local 0");
            assert.equal(expected, actual);
        });
    });
    describe('arithmetic', function() {
        it("arg1 of a add", function() {
            var expected = "add";
            var actual = codeWriter.arg1("add");
            assert.equal(expected, actual);
        });
    });
});

describe('Command Type', function() {
    it("C_ARITHMETIC", function() {

        var expected = "C_ARITHMETIC";
        var arithmeticCommands = ["add", "sub", "neg", "eq",
                                  "gt", "lt", "and", "or", "not"];
        arithmeticCommands.forEach(function(cmd) {
            actual = codeWriter.commandType(cmd);
            assert.equal(actual, expected);
        });

    });
    it("C_PUSH", function() {
        var actual = codeWriter.commandType("push constant 10");
        var expected = "C_PUSH";
        assert.equal(actual, expected);

    });
    it("C_POP", function() {
        var actual = codeWriter.commandType("pop local 10");
        var expected = "C_POP";
        assert.equal(actual, expected);
    });
    // it("C_LABEL", function() {

    // });
    // it("C_GOTO", function() {

    // });
    // it("C_IF", function() {

    // });
    // it("C_FUNCTION", function() {

    // });
    // it("C_RETURN", function() {

    // });

});
