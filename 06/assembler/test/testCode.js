var assert = require('assert');
var code = require('../code.js');

describe('Code', function() {

    describe('dest', function() {

        it('null', function() {
            assert.equal(code.dest(null), "000");

        });
        it('a comment after an instruction', function() {
            assert.equal(code.dest("M"), "001");
            assert.equal(code.dest("D"), "010");
            assert.equal(code.dest("MD"), "011");
            assert.equal(code.dest("AMD"), "111");

        });
    });
    describe('comp', function() {

        it('when a eqs zero', function() {
            assert.equal(code.comp("0"), "0101010");
            assert.equal(code.comp("1"), "0111111");
            assert.equal(code.comp("A"), "0110000");
            assert.equal(code.comp("!A"), "0110001");
            assert.equal(code.comp("A-1"), "0110010");
            assert.equal(code.comp("A+1"), "0110111");
            assert.equal(code.comp("A-D"), "0000111");

        });
        it('when a is not zero', function() {
            assert.equal(code.comp("M"), "1110000");
            assert.equal(code.comp("!M"), "1110001");
            assert.equal(code.comp("M-1"), "1110010");
            assert.equal(code.comp("M+1"), "1110111");
            assert.equal(code.comp("M-D"), "1000111");

        });
    });
    describe('jump', function() {

        it('no jump directive', function() {
            assert.equal(code.jump(null), "000");

        });
        it('jump directive', function() {
            assert.equal(code.jump("JMP"), "111");

        });
    });
});
