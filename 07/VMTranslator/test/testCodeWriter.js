var assert = require('assert');
var Parser = require('../Parser');
var CodeWriter = require('../CodeWriter');

describe("Writing code", function() {
    it('setting filename', function() {
        var codeWriter = new CodeWriter();
        codeWriter.fileName = "blabla.vm";
        assert.equal(codeWriter.fileName, "blabla.vm");
    })

    describe('pushing', function() {
        var codeWriter = new CodeWriter();
        it('constant', function() {
            var actual = codeWriter.writeAssembly("push constant 10");
            var expected = [
                "// push constant 10",
                "@10",
                "D=A",
                "@SP",
                "A=M",
                "M=D",
                "@SP",
                "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
        it('push local', function() {
            var actual = codeWriter.writeAssembly("push local 0");
            var expected = [
                "// push local 0",
                "@0",
                "D=A",
                "@LCL",
                "A=D+M",
                "D=M",
                "@SP",
                "A=M",
                "M=D",
                "@SP",
                "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
        it('that', function() {
            var actual = codeWriter.writeAssembly("push that 5");
            var expected = [
                "// push that 5",
                "@5",
                "D=A",
                "@THAT",
                "A=D+M",
                "D=M",
                "@SP",
                "A=M",
                "M=D",
                "@SP",
                "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
        it('temp', function() {
            var actual = codeWriter.writeAssembly("push temp 6");
            var expected = [
                "// push temp 6",
                "@11",
                "D=M",
                "@SP",
                "A=M",
                "M=D",
                "@SP",
                "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
        it('this', function() {
            var actual = codeWriter.writeAssembly("push this 6");
            var expected = [
                "// push this 6", "@6", "D=A", "@THIS",
                "A=D+M", "D=M", "@SP",
                "A=M", "M=D","@SP","M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
        it('pointer', function() {
            var actual = codeWriter.writeAssembly("push pointer 1");
            var expected = [
                "// push pointer 1",
                "@THAT",
                "D=M",
                "@SP",
                "A=M",
                "M=D",
                "@SP",
                "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
        it('pointer', function() {
            var actual = codeWriter.writeAssembly("push pointer 0");
            var expected = [
                "// push pointer 0",
                "@THIS",
                "D=M",
                "@SP",
                "A=M",
                "M=D",
                "@SP",
                "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
    });
    describe('popping', function() {
        var codeWriter = new CodeWriter();
        it('pointer', function() {
            var actual = codeWriter.writeAssembly("pop pointer 1");
            var expected = [
                "// pop pointer 1",
                "@SP",
                "M=M-1",
                "A=M",
                "D=M",
                "@THAT",
                "M=D"
            ];
            assert.deepEqual(actual, expected);
        });
        it('pointer', function() {
            var actual = codeWriter.writeAssembly("pop pointer 0");
            var expected = [
                "// pop pointer 0",
                "@SP",
                "M=M-1",
                "A=M",
                "D=M",
                "@THIS",
                "M=D"
            ];
            assert.deepEqual(actual, expected);
        });
        it('local', function() {
            var actual = codeWriter.writeAssembly("pop local 0");
            var expected = [
                "// pop local 0",
                "@0", "D=A", "@LCL",
                "D=D+M", "@addr", "M=D",
                "@SP", "M=M-1", "@SP",
                "A=M","D=M", "@addr",
                "A=M","M=D"
            ];
            assert.deepEqual(actual, expected);
        });
        it('that', function() {
            var actual = codeWriter.writeAssembly("pop that 5");
            var expected = [
                "// pop that 5",
                "@5", "D=A", "@THAT",
                "D=D+M", "@addr",
                "M=D", "@SP", "M=M-1",
                "@SP","A=M","D=M",
                "@addr","A=M","M=D",
            ];
            assert.deepEqual(actual, expected);
        });
        it('argument', function() {
            var actual = codeWriter.writeAssembly("pop argument 2");
            var expected = [
                "// pop argument 2",
                "@2", "D=A", "@ARG",
                "D=D+M", "@addr", "M=D",
                "@SP", "M=M-1", "@SP",
                "A=M", "D=M", "@addr",
                "A=M", "M=D",
            ];
            assert.deepEqual(actual, expected);
        });
        it('temp', function() {
            var actual = codeWriter.writeAssembly("pop temp 6");
            var expected = [
                "// pop temp 6",
                "@11", "D=A", "@addr", "M=D",
                "@SP",  "M=M-1", "@SP",
                "A=M",  "D=M", "@addr",
                "A=M", "M=D"
            ];
            assert.deepEqual(actual, expected);
        });

    });

    describe('arithmetic commands', function() {
        var codeWriter = new CodeWriter();
        var command = "add";
        assert.equal(codeWriter.commandType(command),  "C_ARITHMETIC");
        it("add", function() {
            var actual = codeWriter.writeAssembly(command);
            var expected = [
                "// add",
                "@SP","M=M-1", "@SP",
                "A=M","D=M","@SP",
                "M=M-1","A=M", "D=D+M",
                "@SP","A=M", "M=D",
                "@SP","M=M+1"];
            assert.deepEqual(actual, expected);
        });
        it("sub", function() {
            var actual = codeWriter.writeAssembly("sub");
            var expected = [
                "// sub",
                "@SP", "M=M-1", "@SP",
                "A=M", "D=-M", "@SP",
                "M=M-1", "A=M", "D=D+M",
                "@SP", "A=M", "M=D",
                "@SP", "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });

        it("neg", function() {
            var actual = codeWriter.writeAssembly("neg");
            var expected = [
                "// neg", "@SP", "M=M-1", "@SP", "A=M",
                "D=-M", "@SP", "A=M",
                "M=D", "@SP", "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
        it("eq", function() {
            var codeWriter = new CodeWriter();
            var actual = codeWriter.writeAssembly("eq");
            var expected = [
                "// eq", "@SP", "M=M-1", "@SP",
                "A=M", "D=M", "@SP",
                "M=M-1", "@SP", "A=M",
                "D=D-M", "@NEQ_0", "D;JNE",
                "D=-1", "@SP",
                "A=M", "M=D", "@SP",
                "M=M+1", "@END_0", "0;JMP",
                "(NEQ_0)", "D=0",
                "@SP", "A=M", "M=D",
                "@SP", "M=M+1", "(END_0)"
            ];
            assert.deepEqual(actual, expected);
            actual = codeWriter.writeAssembly("eq");
            var expected = [
                "// eq", "@SP", "M=M-1", "@SP",
                "A=M", "D=M", "@SP",
                "M=M-1", "@SP", "A=M",
                "D=D-M", "@NEQ_1", "D;JNE",
                "D=-1", "@SP",
                "A=M", "M=D", "@SP",
                "M=M+1", "@END_1", "0;JMP",
                "(NEQ_1)", "D=0",
                "@SP", "A=M", "M=D",
                "@SP", "M=M+1", "(END_1)"
            ];
            assert.deepEqual(actual, expected);
        });
        it("gt", function() {
            var codeWriter = new CodeWriter();
            var actual = codeWriter.writeAssembly("gt");
            // if we have to ands it breaks down !!
            var expected = [
                "// gt", "@SP", "M=M-1", "@SP",
                "A=M", "D=M", "@SP",
                "M=M-1", "@SP", "A=M",
                "D=M-D ", "@TRUE_0", "D;JGT ",
                "@SP", "A=M", "M=0",
                "@SP", "M=M+1", "@END_0",
                "0;JMP", "(TRUE_0)", "@SP",
                "A=M", "M=-1", "@SP",
                "M=M+1", "(END_0)"
            ];
            assert.deepEqual(actual, expected);
        });
        it("lt", function() {
            var actual = codeWriter.writeAssembly("lt");
            var expected = [
                "// lt", "@SP", "M=M-1", "@SP",
                "A=M", "D=M", "@SP",
                "M=M-1", "@SP", "A=M",
                "D=M-D ", "@TRUE_0",
                "D;JLT",
                "@SP", "A=M", "M=0",
                "@SP", "M=M+1", "@END_0",
                "0;JMP", "(TRUE_0)", "@SP",
                "A=M", "M=-1", "@SP",
                "M=M+1", "(END_0)"
            ];
            assert.deepEqual(actual, expected);
        });
        it("and", function() {
            var actual = codeWriter.writeAssembly("and");
            var expected = [
                "// and", "@SP", "M=M-1", "@SP",
                "A=M", "D=M", "@SP",
                "M=M-1",  "@SP", "A=M",
                "D=D&M", "@SP", "A=M",
                "M=D", "@SP", "M=M+1"

            ];
            assert.deepEqual(actual, expected);
        });
        it("or", function() {
            var actual = codeWriter.writeAssembly("or");
            var expected = [
                "// or", "@SP", "M=M-1", "@SP",
                "A=M", "D=M", "@SP",
                "M=M-1", "@SP", "A=M",
                "D=D|M", "@SP",
                "A=M", "M=D", "@SP",
                "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
        it("not", function() {
            var command = "not";
            var actual = codeWriter.writeAssembly(command);
            var expected = [
                "// not", "@SP", "M=M-1", "@SP",
                "A=M","D=!M", "@SP",
                "A=M","M=D", "@SP",
                "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
    });
});

describe('args', function() {

    describe('Push', function() {
        var codeWriter = new CodeWriter();
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
        var codeWriter = new CodeWriter();
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
        var codeWriter = new CodeWriter();
        it("arg1 of a add", function() {
            var expected = "add";
            var actual = codeWriter.arg1("add");
            assert.equal(expected, actual);
        });
    });
});
describe('Labels', function() {

    it("keeps state", function() {
        var codeWriter = new CodeWriter();
        var firstLabel = codeWriter.getLabel("Hello");
        assert.equal(firstLabel.aCommand, "@Hello_0");
        assert.equal(firstLabel.label, "(Hello_0)");
        var secondLabel = codeWriter.getLabel("Hello");
        assert.equal(secondLabel.aCommand, "@Hello_1");
        assert.equal(secondLabel.label, "(Hello_1)");
    });
});
describe('Command Type', function() {
    var codeWriter = new CodeWriter();
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
