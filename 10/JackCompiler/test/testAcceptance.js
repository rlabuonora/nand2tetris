var assert = require('assert');
const execSync = require('child_process').execSync;
var chai = require('chai');
chai.use(require('chai-string'));
var fs = require('fs');
var JackTokenizer = require('../JackTokenizer');
var CompilationEngine = require('../CompilationEngine');
var chai = require('chai');
chai.use(require('chai-string'));


describe('Acceptance tests', function() {

    var helper = {
        parseCommand: function(location, fileName) { return "node CompilationEngine.js " + location + "/"  + fileName + ".jack"; },
        compareCommand: function(location, fileName) { return "TextComparer.sh " + location + "/" + fileName  + ".xml " + location + "/My" + fileName + ".xml" ; },
        destinationFile: function(location, fileName) {
            return location +"/" + fileName + "/" + ".xml";
        }

    };


    describe('Expressionless Square', function() {
        var location = "../ExpressionlessSquare";
        it('main', function() {
            var fileName = "Main";
            var parseCommand = helper.parseCommand( location, fileName );
            execSync( parseCommand );

            var compareCommand = helper.compareCommand(location, fileName);

            var actual = execSync( compareCommand ).toString();
            var expected = "Comparison ended successfully\n";
            assert.equal(actual, expected);
        });
        it('Square Game', function() {
            var fileName = "SquareGame";
            var parseCommand = helper.parseCommand( location, fileName );
            execSync( parseCommand );

            var compareCommand = helper.compareCommand(location, fileName);

            var actual = execSync( compareCommand ).toString();
            var expected = "Comparison ended successfully\n";
            assert.equal(actual, expected);
        });
        it('Square', function() {
            var fileName = "Square";
            var parseCommand = helper.parseCommand( location, fileName );
            execSync( parseCommand );

            var compareCommand = helper.compareCommand(location, fileName);

            var actual = execSync( compareCommand ).toString();
            var expected = "Comparison ended successfully\n";
            assert.equal(actual, expected);
        });
    })
    describe('Array Test', function() {
        var location = '../ArrayTest'
        it('Main', function() {
            var fileName = "Main";
            var parseCommand = helper.parseCommand( location, fileName );
            execSync( parseCommand );

            var compareCommand = helper.compareCommand(location, fileName);
            var actual = execSync( compareCommand ).toString();
            var expected = "Comparison ended successfully\n";
            assert.equal(actual, expected);
        });
    });
});
