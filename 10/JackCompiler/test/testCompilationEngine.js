var assert = require('assert');
const execSync = require('child_process').execSync;
var chai = require('chai');
chai.use(require('chai-string'));
var fs = require('fs');
var JackTokenizer = require('../JackTokenizer');
var CompilationEngine = require('../CompilationEngine');
var chai = require('chai');
chai.use(require('chai-string'));

describe('statement', function() {

    var tokenizer = new JackTokenizer();
    var engine = new CompilationEngine();
    
    xit('Main.jack', function() {
        var prog = fs.readFileSync('../ExpressionlessSquare/Main.jack', 'utf-8');
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileClass();
        var expected = fs.readFileSync('../ExpressionlessSquare/Main.xml', 'utf-8');
        chai.assert.equalIgnoreSpaces(actual, expected);

    });

    xit('ArrayTest', function() {
        var prog = fs.readFileSync('../ArrayTest/Main.jack', 'utf-8');
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileClass();
        var expected = fs.readFileSync('../ArrayTest/Main.xml', 'utf-8');
        chai.assert.equalIgnoreSpaces(actual, expected);

    });

    it('Square.jack', function() {
        var prog = fs.readFileSync('../ExpressionlessSquare/Square.jack', 'utf-8');
        engine.tokens = tokenizer.tokenize(prog);
        var actual = engine.compileClass();
        var expected = fs.readFileSync('../ExpressionlessSquare/Square.xml', 'utf-8');
        chai.assert.equalIgnoreSpaces(actual, expected);

    });

    describe('compiling classes', function() {

    it('statements', function() {

        engine.tokens = tokenizer.tokenize('let x = x;\n do move();');
        var actual = engine.compileStatements();
        var expected =
                "<statements>\n" +
                "  <letStatement>\n" +
                "    <keyword> let </keyword>\n" +
                "    <identifier> x </identifier>\n" +
                "    <symbol> = </symbol>\n" +
                "      <expression>\n" +
                "        <term>\n" +
                "          <identifier> x </identifier>\n" +
                "        </term>\n" +
                "      </expression>\n" +
                "    <symbol> ; </symbol>" +
                "  </letStatement>" +
                "  <doStatement>\n" +
                "    <keyword> do </keyword>\n" +
                "    <identifier> move </identifier>\n" +
                "    <symbol> ( </symbol>\n" +
                "    <expressionList>\n" +
                "    </expressionList>\n" +
                "    <symbol> ) </symbol>\n" +
                "    <symbol> ; </symbol>\n" +
                "  </doStatement>\n" +
                "</statements>";
        chai.assert.equalIgnoreSpaces(actual, expected );

    });
    it('statements', function() {

        engine.tokens = tokenizer.tokenize('let x = x;\n do move(); return;');
        var actual = engine.compileStatements();
        var expected =
                "<statements>\n" +
                "  <letStatement>\n" +
                "    <keyword> let </keyword>\n" +
                "    <identifier> x </identifier>\n" +
                "    <symbol> = </symbol>\n" +
                "      <expression>\n" +
                "        <term>\n" +
                "          <identifier> x </identifier>\n" +
                "        </term>\n" +
                "      </expression>\n" +
                "    <symbol> ; </symbol>" +
                "  </letStatement>" +
                "  <doStatement>\n" +
                "    <keyword> do </keyword>\n" +
                "    <identifier> move </identifier>\n" +
                "    <symbol> ( </symbol>\n" +
                "    <expressionList>\n" +
                "    </expressionList>\n" +
                "    <symbol> ) </symbol>\n" +
                "    <symbol> ; </symbol>\n" +
                "  </doStatement>\n" +
                "  <returnStatement>\n" +
                "    <keyword> return </keyword>\n" +
                "    <symbol> ; </symbol>\n" +
                "  </returnStatement>\n" +
                "</statements>";
        chai.assert.equalIgnoreSpaces(actual, expected );

    });
});
