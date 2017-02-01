var assert = require('assert');
var fs = require('fs');
var VMTranslator = require('../VMTranslator');

describe('acceptance test', function() {


    it('Basic Test', function() {
        var testPath = "../MemoryAccess/BasicTest/";
        var command = "node VMTranslator.js " + testPath;
        const execSync = require('child_process').execSync;
        
        var a = execSync(command + "BasicTest.vm");
        var b = execSync( "CPUEmulator.sh " + testPath + "BasicTest.tst" );
        var expected = "End of script - Comparison ended successfully\n";
        var actual = b.toString();
        assert.equal(actual, expected);
        });
    });
