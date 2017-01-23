var assert = require('assert');
var Parser = require('../Parser');


describe('parser', function() {
    describe('Removing comments', function() {
        it('..', function() {
            var file = './test/support/realFiles/realFile.vm';
            var parser = new Parser( file );
            assert.equal(parser.commands.length, 25);
            assert.equal(parser.commands[0], "push constant 10");
        });
    });
    describe('Command Type', function() {
        
        
        var parser = new Parser();
        
        it("C_ARITHMETIC", function() {

            var expected = "C_ARITHMETIC";
            var arithmeticCommands = ["add", "sub", "neg", "eq",
                                      "gt", "lt", "and", "or", "not"];
            arithmeticCommands.forEach(function(cmd) {
                actual = parser.commandType(cmd);
                assert.equal(actual, expected);
            });
            
        });
        it("C_PUSH", function() {
            var actual = parser.commandType("push constant 10");
            var expected = "C_PUSH";
            assert.equal(actual, expected);

        });
        it("C_POP", function() {
            var actual = parser.commandType("pop local 10");
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
});
