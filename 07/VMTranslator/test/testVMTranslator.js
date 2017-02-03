var assert = require('assert');
var fs = require('fs');
var VMTranslator = require('../VMTranslator');
const execSync = require('child_process').execSync;


describe('Acceptance tests', function() {

    var helper = {
        translateCommand: function(location, testName) { return "node VMTranslator.js " + location + "/" + testName + "/" + testName + ".vm"; },
        compareCommand: function(location, testName) { return "CPUEmulator.sh " + location + "/" + testName + "/" + testName + ".tst"; },
        destinationFile: function(location, testName) {
            return location +"/" + testName + "/" + testName + ".asm";
        }
    };
    describe('Memory Access', function() {
        it('Basic Test', function() {
            var location = "../MemoryAccess";
            var testName = "BasicTest";
            var translateCommand = helper.translateCommand( location, testName);
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });
        it('Pointer Test', function() {
            var location = "../MemoryAccess";
            var testName = "PointerTest";
            var translateCommand = helper.translateCommand( location, testName);
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });
        it('Static Test', function() {
            var location = "../MemoryAccess";
            var testName = "StaticTest";
            var translateCommand = helper.translateCommand( location, testName);
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });
    });

    describe('Stack Arithmetic', function() {
        it('Simple Add', function() {
            var location = "../StackArithmetic";
            var testName = "SimpleAdd";
            var translateCommand = helper.translateCommand( location, testName);
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });
        it('Simple Sub', function() {
            var location = "../StackArithmetic";
            var testName = "SimpleSub";
            var translateCommand = helper.translateCommand( location, testName);
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });
        it('Stack Test', function() {
            var location = "../StackArithmetic";
            var testName = "StackTest";
            var translateCommand = helper.translateCommand( location, testName);
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });
    });

    describe("Program Flow", function() {
        it('Basic Loop', function() {
            var location = "../../08/ProgramFlow";
            var testName = "BasicLoop";
            var translateCommand = helper.translateCommand( location, testName);
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });
        it('Fibonacci Series', function() {
            var location = "../../08/ProgramFlow";
            var testName = "FibonacciSeries";
            var translateCommand = helper.translateCommand( location, testName);
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });

        it('If Goto', function() {
            var location = "../../08/ProgramFlow";
            var testName = "IfGoto";
            var translateCommand = helper.translateCommand( location, testName);
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });
        it('If Goto False', function() {
            var location = "../../08/ProgramFlow";
            var testName = "IfGotoFalse";
            var translateCommand = helper.translateCommand( location, testName);
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });
    });
    describe("Function Calls", function() {
        it("Nested Call", function() {
            var location = "../../08/FunctionCalls";
            var testName = "NestedCall";
            var translateCommand = helper.translateCommand( location, testName);
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });
        it("Fibonacci Element", function() {
            var location = "../../08/FunctionCalls";
            var testName = "FibonacciElement";
            var translateCommand = "node VMTranslator.js ../../08/FunctionCalls/FibonacciElement";
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });
        it("Statics Test", function() {
            var location = "../../08/FunctionCalls";
            var testName = "StaticsTest";
            var translateCommand = "node VMTranslator.js ../../08/FunctionCalls/StaticsTest";
            execSync( translateCommand );
            var compareCommand = helper.compareCommand( location, testName );
            var actual = execSync( compareCommand  ).toString();
            var expected = "End of script - Comparison ended successfully\n";
            assert.equal(actual, expected);
            fs.unlink(helper.destinationFile( location, testName));
        });
    });
});
