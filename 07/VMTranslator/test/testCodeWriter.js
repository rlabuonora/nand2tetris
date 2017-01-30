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
        it('static', function() {
            var codeWriter = new CodeWriter();
            codeWriter.fileName = "StaticTest"
            var actual = codeWriter.writeAssembly("push static 1");
            var expected = [
                "// push static 1",
                "@StaticTest.1",
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
        codeWriter.fileName = "StaticTest"
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
        it('static', function() {
            var actual = codeWriter.writeAssembly("pop static 8");
            var expected = [
                "// pop static 8",
                "@SP",
                "M=M-1",
                "A=M",
                "D=M",
                "@StaticTest.8",
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

