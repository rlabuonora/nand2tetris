var assert = require('assert');
const execSync = require('child_process').execSync;
var JackTokenizer = require('../JackTokenizer');
var fs = require('fs');

describe("Tokenizer", function() {

    var helper = {
        translateCommand: function(location, fileName) { return "node JackTokenizer.js " + location + "/"  + fileName + ".jack"; },
        compareCommand: function(location, fileName) { return "TextComparer.sh " + location + "/" + fileName  + "T.xml " + location + "/My" + fileName + "T.xml" ; },
        destinationFile: function(location, fileName) {
            return location +"/" + fileName + "/" + "T.xml";
        }
    };
    it('Array Test', function() {
        var location = "../ArrayTest";
        var fileName =  "Main";
        var tokenizeCommand = helper.translateCommand(location, fileName);
        execSync( tokenizeCommand );
        var compareCommand = helper.compareCommand(location, fileName);
        var actual = execSync( compareCommand ).toString();
        var expected = "Comparison ended successfully\n";
        assert.equal(actual, expected);
        fs.unlink(helper.destinationFile( location, fileName));

    });

    describe('Expressionless Square', function() {
        var location = "../ExpressionlessSquare";
        it('Main', function() {
            var fileName =  "Main";
            var tokenizeCommand = helper.translateCommand(location, fileName);
            execSync( tokenizeCommand );
            var compareCommand = helper.compareCommand(location, fileName);

            var actual = execSync( compareCommand ).toString();
            var expected = "Comparison ended successfully\n";
            assert.equal(actual, expected);


        });
        it('SquareGame', function() {
            var fileName =  "SquareGame";
            var tokenizeCommand = helper.translateCommand(location, fileName);
            execSync( tokenizeCommand );
            var compareCommand = helper.compareCommand(location, fileName);

            var actual = execSync( compareCommand ).toString();
            var expected = "Comparison ended successfully\n";
            assert.equal(actual, expected);



        });
        it('Square', function() {
            var fileName =  "Square";
            var tokenizeCommand = helper.translateCommand(location, fileName);
            execSync( tokenizeCommand );
            var compareCommand = helper.compareCommand(location, fileName);

            var actual = execSync( compareCommand ).toString();
            var expected = "Comparison ended successfully\n";
            assert.equal(actual, expected);


        });
    });
    describe('Square', function() {
        var location = "../Square";
        it('Main', function() {
            var fileName =  "Main";
            var tokenizeCommand = helper.translateCommand(location, fileName);
            execSync( tokenizeCommand );
            var compareCommand = helper.compareCommand(location, fileName);
            var actual = execSync( compareCommand ).toString();
            var expected = "Comparison ended successfully\n";
            assert.equal(actual, expected);
        });
        it('SquareGame', function() {
            var fileName =  "SquareGame";
            var tokenizeCommand = helper.translateCommand(location, fileName);
            execSync( tokenizeCommand );
            var compareCommand = helper.compareCommand(location, fileName);

            var actual = execSync( compareCommand ).toString();
            var expected = "Comparison ended successfully\n";
            assert.equal(actual, expected);
        });
        it('Square', function() {
            var fileName =  "Square";
            var tokenizeCommand = helper.translateCommand(location, fileName);
            execSync( tokenizeCommand );
            var compareCommand = helper.compareCommand(location, fileName);

            var actual = execSync( compareCommand ).toString();
            var expected = "Comparison ended successfully\n";
            assert.equal(actual, expected);

        });
    });

    describe('Regexp Test', function() {
        var re = /\/\/.*(\r)?\n|\/\*[\s\S]*?\*\/|\n|\r|\t/g;
        try {
            var prog = fs.readFileSync('../Square/Main.jack', 'utf8');
        } catch(e) {
            console.log("Error", e.stack);
        }

        it('Removes comments', function() {
            actual = prog.replace(re, "");
            assert.equal(actual.indexOf("/*"), -1);
        });

        it('Does not remove code between comments', function() {
            actual = prog.replace(re, "");
            assert.equal(actual.indexOf("/*"), -1);
        });

        it('regexp', function() {
            actual = prog.replace(re, "");
            assert.notEqual(actual.indexOf("Main"), -1);
        });
    });
});
