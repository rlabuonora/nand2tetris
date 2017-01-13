var assert = require('assert');
var preprocess = require('../assembler.js').preprocess;


describe('Regular expression', function() {

    describe('removing comments', function() {

        var re = /\/\/.*$/;

        it('full line comment', function() {
            var str = "// this is a comment";
            assert.equal(str.replace(re, ""), "");
        });
        it('a comment after an instruction', function() {
            var str = "ADD 1 + 2 // this is a comment";
            assert.equal(str.replace(re, ""), "ADD 1 + 2 ");
        });
    });
});


describe('Removing whitespace', function() {

    it('blank line', function() {
        var str = "      ";
        assert.equal(str.trim(), "");
    });

    it('Leading whitespace', function() {
        var str = "   ADD 1 + 2";
        assert.equal(str.trim(), "ADD 1 + 2");
    });

    it('Trailing whitespace', function() {
        var str = "ADD 1 + 2    ";
        assert.equal(str.trim(), "ADD 1 + 2");
    });

    it('Leading & trailing whitespace', function() {
        var str = "   ADD 1 + 2    ";
        assert.equal(str.trim(), "ADD 1 + 2");
    });
});


describe('Removing whitespace and comments', function() {

    it('an empty line', function() {
        var str = "";
        assert.equal(preprocess(str), "");
    });

    it('a blank line', function() {
        var str = "      ";
        assert.equal(preprocess(str), "");
    });

    it('an instruction ', function() {
        var str = "ADD 1 + 2";
        assert.equal(preprocess(str), "ADD 1 + 2");
    });


    it('an instruction with a comment', function() {
        var str = "ADD 1 + 2  // This is a comment";
        assert.equal(preprocess(str), "ADD 1 + 2");
    });

    it('a comment', function() {
        var str = "// This is a comment";
        assert.equal(preprocess(str), "");
    });
});


