var assert = require('assert');
var fs = require('fs');
var VMTranslator = require('../VMTranslator');
const execSync = require('child_process').execSync;


describe('acceptance test', function() {
    
    var helper = {
        translateCommand: function(location, testName) { return "node VMTranslator.js " + location + "/" + testName + "/" + testName + ".vm"; },
        compareCommand: function(location, testName) { return "CPUEmulator.sh " + location + "/" + testName + "/" + testName + ".tst"; }
    };

    it('Basic Test', function() {
        var location = "../MemoryAccess";
        var testName = "BasicTest";
        var translateCommand = helper.translateCommand( location, testName);
        execSync( translateCommand );
        var compareCommand = helper.compareCommand( location, testName );
        var actual = execSync( compareCommand  ).toString();
        var expected = "End of script - Comparison ended successfully\n";
        assert.equal(actual, expected);
    });
});
