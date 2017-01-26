var assert = require('assert');
var Parser = require('../Parser');


describe('parser', function() {
    describe('Removing comments', function() {
        it('..', function() {
            var file = './test/support/realFiles/realFile.vm';
            var parser = new Parser( file );
            console.log(parser.commands);
            assert.equal(parser.commands.length, 25);
            assert.equal(parser.commands[0], "push constant 10");

        });
        it('..', function() {
            var file = './test/support/singleFile/singleFile.vm';
            var parser = new Parser( file );
            assert.equal(parser.commands.length, 1);
            assert.equal(parser.commands[0], "push constant 0");
        });
    });
});
