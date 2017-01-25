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
                "@6", "D=A", "@THIS",
                "A=D+M", "D=M", "@SP",
                "A=M", "M=D","@SP","M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
    });
    describe('popping', function() {
        var codeWriter = new CodeWriter();
        it('local', function() {
            var actual = codeWriter.writeAssembly("pop local 0");
            var expected = [
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
                "@SP", "M=M-1", "@SP",
                "A=M", "D=-M", "@SP",
                "M=M-1", "A=M", "D=D+M",
                "@SP", "A=M", "M=D",
                "@SP", "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });

        xit("neg", function() {
            var actual = codeWriter.writeAssembly("neg");
            var expected = [
                "@SP", "M=M-1", "A=M",
                "D=-M", "@SP", "A=M",
                "M=D", "@SP", "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
        xit("eq", function() {
            var actual = codeWriter.writeAssembly("eq");
            // if we have to ands it breaks down !!
            var expected = [
                "@SP", "M=M-1", "@SP",
                "A=M", "D=M", "@SP",
                "M=M-1", "@SP", "A=M",
                "D=D-M", "@NEQ", "D;JNE",
                "@0", "D=A", "@SP",
                "A=M", "M=D", "@SP",
                "M=M+1", "@END", "0;JMP",
                "(NEQ)", "@-1", "D=A",
                "@SP", "A=M", "M=D",
                "@SP", "M=M+1", "(END)"
            ];
            assert.deepEqual(actual, expected);
        });
        xit("gt", function() {
            var actual = codeWriter.writeAssembly("gt");
            // if we have to ands it breaks down !!
            var expected = [
                "@SP", "M=M-1", "@SP",
                "A=M", "D=M", "@SP",
                "M=M-1", "@SP", "A=M",
                "D=M-D ", "@PUSH_TRUE", "D;JGT ",
                "@SP", "A=M", "M=0",
                "@SP", "M=M+1", "@END_IF",
                "0;JMP", "(PUSH_TRUE)", "@SP",
                "A=M", "M=-1", "@SP",
                "M=M+1", "(END_IF)"
            ];
            assert.deepEqual(actual, expected);
        });
        xit("lt", function() {
            var actual = codeWriter.writeAssembly("lt");
            var expected = [
            ];
            assert.deepEqual(actual, expected);
        });
        it("and", function() {
            var actual = codeWriter.writeAssembly("and");
            var expected = [
                "@SP", "M=M-1", "@SP",
                "A=M", "D=M", "@SP",
                "M=M-1",  "@SP", "A=M",
                "D=D&M", "D=-D", "@SP", "A=M",
                "M=D", "@SP", "M=M+1"

            ];
            assert.deepEqual(actual, expected);
        });
        it("or", function() {
            var actual = codeWriter.writeAssembly("or");
            var expected = [
                "@SP", "M=M-1", "@SP",
                "A=M", "D=M", "@SP",
                "M=M-1", "@SP", "A=M",
                "D=D|M", "D=-D", "@SP",
                "A=M", "M=D", "@SP",
                "M=M+1"
            ];
            assert.deepEqual(actual, expected);
        });
        it("not", function() {
            var command = "not";
            var actual = codeWriter.writeArithmetic(command);
            var expected = [
                "@SP", "M=M-1", "@SP",
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
