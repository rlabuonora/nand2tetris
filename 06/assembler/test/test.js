var assert = require('assert');



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
