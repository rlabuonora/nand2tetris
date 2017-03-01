var assert = require('assert');
var chai = require('chai');
chai.use(require('chai-string'));
var fs = require('fs');
var JackTokenizer = require('../JackTokenizer');
var CompilationEngine = require('../CompilationEngine');
var chai = require('chai');
chai.use(require('chai-string'));

describe("expression", function() {

    var tokenizer = new JackTokenizer();
    var engine = new CompilationEngine();

    it('var name', function() { // ported
        var prog = "x)";
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileExpression();
        var expected = "<expression>\n" +
                "<term>\n" +
                "<identifier> x </identifier>\n" +
                "</term>\n" +
                "</expression>";

        chai.assert.equalIgnoreSpaces(actual, expected);
        // does not consume ) token
        assert(engine.tokens[0].value === ')');
    });

    it(' expression with unary op', function() { // ported
        var prog = "~x";
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileExpression();
        var expected = "<expression>\n" +
                "<term>\n" +
                "<symbol> ~ </symbol>\n" +
                "<term>\n" +
                "<identifier> x </identifier>\n" +
                "</term>\n" +
                "</term>\n" +
                "</expression>"
        chai.assert.equalIgnoreSpaces(actual, expected);


    });

    it('expression with binary op', function() { // ported
        var prog = "x + size";
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileExpression();
        var expected = "<expression>\n" +
                "<term>\n" +
                "<identifier> x </identifier>\n" +
                "</term>\n" +
                "<symbol> + </symbol>\n" +
                "<term>\n" +
                "<identifier> size </identifier>\n" +
                "</term>\n" +
                "</expression>\n";
        chai.assert.equalIgnoreSpaces(actual, expected);
    });

    it('integer constant', function() { // ported
        var prog = "1";
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileExpression();
        var expected = "<expression>\n" +
                "<term>\n" +
                "<integerConstant> 1 </integerConstant>\n" +
                "</term>\n" +
                "</expression>\n";
        chai.assert.equalIgnoreSpaces(actual, expected);
    });

    it('string constant', function() {  // ported
        var prog = '"algo"';
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileExpression();
        var expected = "<expression>\n" +
                "<term>\n" +
                "<stringConstant> algo  </stringConstant>\n" +
                "</term>\n" +
                "</expression>\n"
        chai.assert.equalIgnoreSpaces(actual, expected);
    });


    it('keyword constant', function() { // ported
        var prog = "this";
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileExpression();
        var expected =     "<expression>\n" +
                "<term>\n" +
                "<keyword> this </keyword>\n" +
                "</term>\n" +
                "</expression>\n";
        chai.assert.equalIgnoreSpaces(actual, expected);
    });

    it("expression list", function() { // ported
        var prog = "(x, (y + size) - 1, x + size, y + size)";
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileExpressionList();
        var expected = "<expressionList>\n" +
                "<expression>\n" +
                "<term>\n" +
                "<identifier> x </identifier>\n" +
                "</term>\n" +
                "</expression>\n" +
                "<symbol> , </symbol>\n" +
                "<expression>\n" +
                "<term>\n" +
                "<symbol> ( </symbol>\n" +
                "<expression>\n" +
                "<term>\n" +
                "<identifier> y </identifier>\n" +
                "</term>\n" +
                "<symbol> + </symbol>\n" +
                "<term>\n" +
                "<identifier> size </identifier>\n" +
                "</term>\n" +
                "</expression>\n" +
                "<symbol> ) </symbol>\n" +
                "</term>\n" +
                "<symbol> - </symbol>\n" +
                "<term>\n" +
                "<integerConstant> 1 </integerConstant>\n" +
                "</term>\n" +
                "</expression>\n" +
                "<symbol> , </symbol>\n" +
                "<expression>\n" +
                "<term>\n" +
                "<identifier> x </identifier>\n" +
                "</term>\n" +
                "<symbol> + </symbol>\n" +
                "<term>\n" +
                "<identifier> size </identifier>\n" +
                "</term>\n" +
                "</expression>\n" +
                "<symbol> , </symbol>\n" +
                "<expression>\n" +
                "<term>\n" +
                "<identifier> y </identifier>\n" +
                "</term>\n" +
                "<symbol> + </symbol>\n" +
                "<term>\n" +
                "<identifier> size </identifier>\n" +
                "</term>\n" +
                "</expression>\n" +
                "</expressionList>\n";
        chai.assert.equalIgnoreSpaces(actual, expected);
    });
    it("inequality",  function() { // ported
        var prog = "(x + size) < 510";
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileExpression();
        var expected =  "<expression>\n" +
                "<term>\n" +
                "<symbol> ( </symbol>\n" +
                "<expression>\n" +
                "<term>\n" +
                "<identifier> x </identifier>\n" +
                "</term>\n" +
                "<symbol> + </symbol>\n" +
                "<term>\n" +
                "<identifier> size </identifier>\n" +
                "</term>\n" +
                "</expression>\n" +
                "<symbol> ) </symbol>\n" +
                "</term>\n" +
                "<symbol> &lt; </symbol>\n" +
                "<term>\n" +
                "<integerConstant> 510 </integerConstant>\n" +
                "</term>\n" +
                "</expression>";
        chai.assert.equalIgnoreSpaces(actual, expected);
    });
    xit("subroutine call", function() { // ported
        var prog = "SquareGame.new();"
        var expected = "<expression>\n" +
                "<term>\n" +
                "<identifier> SquareGame </identifier>\n" +
                "<symbol> . </symbol>\n" +
                "<identifier> new </identifier>\n" +
                "<symbol> ( </symbol>\n" +
                "<expressionList>\n" +
                "</expressionList>\n" +
                "<symbol> ) </symbol>\n" +
                "</term>\n" +
                "</expression>";
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileExpression();
        chai.assert.equalIgnoreSpaces(actual, expected);
    });

    it("array access", function() {
        var prog = "a[i]";
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileExpression();
        var expected = "<expression>\n" +
                "<term>\n" +
                "  <identifier> a </identifier>\n" +
                "  <symbol> [ </symbol>\n" +
                "  <expression>\n" +
                "  <term>\n" +
                "<identifier> i </identifier>\n" +
                "</term>\n" +
                "</expression>" +
                "<symbol> ] </symbol>\n" +
                "</term>" +
                "</expression>";
        chai.assert.equalIgnoreSpaces(actual, expected);
    });
})
