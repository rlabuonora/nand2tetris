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
