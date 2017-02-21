var assert = require('assert');
var jackTokens = require('../jackTokens');

describe('printing to xml', function() {
    it('symbols', function() {
        var expected = "<symbol> } </symbol>";
        var token = {   category: 'symbol', value: '}' };
        var actual = jackTokens.writeXML( token );
        assert.equal(expected, actual);
    });
    it('keywords', function() {
        var expected = "<keyword> do </keyword>";
        var token = {   category: 'keyword', value: 'do' };
        var actual = jackTokens.writeXML( token );
        assert.equal(expected, actual);
    });
    it('identifiers', function() {
        var expected = "<identifier> length </identifier>";
        var token = {   category: 'identifier', value: 'length' };
        var actual = jackTokens.writeXML( token );
        assert.equal(expected, actual);
    });
    it('integer constants', function() {
        var expected = "<integerConstant> 1 </integerConstant>"
        var token = {   category: 'integerConstant', value: '1' };
        var actual = jackTokens.writeXML(token);
        assert.equal(expected, actual);
    });
});

describe('Make obj', function() {
    it('integer constants', function() {
        var expected = {   category: 'integerConstant', value: '1' };
        var actual = jackTokens.makeObj('1');
        assert.deepEqual(expected, actual);
    });
    it('keywords', function() {
        var expected = {   category: 'keyword', value: 'class' };
        var actual = jackTokens.makeObj('class');
        assert.deepEqual(expected, actual);
    });
    it('identifiers', function() {
        var expected = {   category: 'identifier', value: 'length' };
        var actual = jackTokens.makeObj('length');
        assert.deepEqual(expected, actual);
    });
});
