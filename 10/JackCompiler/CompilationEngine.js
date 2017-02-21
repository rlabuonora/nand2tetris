var path = require('path');
var fs  = require('fs');
var JackTokenizer = require('./JackTokenizer');
var jackToken = require('./jackTokens');
var templates = require('./templates');

function CompilationEngine( file ) {
    // TODO: API change that allows:
    // sharing code for saving files
    // compiling a file, or a string
    this.eat = function( token ) {
        var head = this.tokens.shift();
        if ( head.category !== token ) throw new Error(`Expected ${token}, got ${head.category}: '${head.value}' `);
        return head;
    };

    this.compileLet = function() {
        this.eat('keyword');
        var i1 = this.eat('identifier');
        this.eat('symbol');
        var i2 = this.eat('identifier');
        var template = templates.let(i1.value, i2.value);
        var sym = this.eat('symbol');
        return template;
    };

    this.compileIf = function() {
        this.eat('keyword');
        this.eat('symbol');
        var expression = this.compileExpression();
        this.eat('symbol');
        this.eat('symbol');
        var statements = this.compileStatements();
        this.eat('symbol');
        return templates.if(expression, statements);
    };

    this.compileReturn = function() {
        this.eat('keyword');
        if (this.tokens[0].value !== ';') {
            var expression = this.compileExpression();
        }
        this.eat('symbol'); // ';'
        return templates.return( expression );
    };

    this.compileWhile = function() {

        // handle logic for parsing tokens into
        // statements
        this.eat('keyword');
        this.eat('symbol');
        var expression = this.compileExpression();
        this.eat('symbol');
        this.eat('symbol');
        var statements = this.compileStatements();
        this.eat('symbol');
        return templates.while(expression, statements);
    };

    this.compileParameterList = function() {
        var params = [];
        while ( this.tokens.length > 0 && this.tokens[0].category !== 'symbol') {
            var type = this.eat('keyword').value; // allow classNames (identifiers)
            var ident = this.eat('identifier').value;
            params.push({ type: type, ident: ident });

            if (this.tokens.length > 0 && this.tokens[0].value === ',') {
                this.eat('symbol');
            }
            else {
                break;
            }
        }
        return templates.parameterList( params );
    };
    this.compileSubroutineDec = function() {
        var scope = this.eat('keyword').value;
        var retType = this.compileType();
        var name = this.eat('identifier').value;
        this.eat('symbol'); // (
        var paramList = this.compileParameterList();
        this.eat('symbol'); // )
        var body = this.compileSubroutineBody();
        return templates.subroutineDec(scope, retType, name, paramList, body);
    };
    this.compileLocalVarDec = function() {
        this.eat('keyword'); // var
        var type = this.compileType();
        var idents = [];
        while (true) {
            idents.push(this.eat('identifier').value);
            if (this.tokens[0].value === ";") break;
            else {
                this.eat('symbol'); // ,
            }
        }
        this.eat('symbol'); // ;
        return templates.localVarDec(type, idents);
    };
    this.compileSubroutineBody = function() {
        this.eat('symbol') // {
        // optional var declarations

        var locals ="";
        while (true) {
            if (this.tokens[0].value !== 'var') break;
            locals += this.compileLocalVarDec();

        }
        var statements = this.compileStatements();
        // compile statements
        this.eat('symbol'); // }
        return templates.subBody(locals, statements );
    };

    this.compileType = function() {
        var next = this.tokens[0].category;
        if ( next === 'keyword') {
            var type = this.eat('keyword').value;
            var tag = 'keyword';
        }
        else if (next === "identifier") {
            var type = this.eat('identifier').value;
            var tag = 'identifier';
        }
        return templates.type(tag, type);
    };
    this.compileClassVarDec = function() {
        var isField = this.eat('keyword').value === 'field';
        var vars = [];
        var type = this.compileType();
        while (true) {
            // TODO: cannot use custom types in declarations
            var ident = this.eat('identifier');
            vars.push( ident.value );
            var nextToken = this.eat('symbol');
            if (nextToken.value === ';') { break; }
        }
        return templates.classVarDec(isField, type, vars);
    };
    this.compileClass = function() {
        this.eat('keyword'); // class
        var className = this.eat('identifier').value;
        this.eat('symbol'); //  {
        var next = this.tokens[0].value;
        var classVarDecs = "";
        while ( next  === "field" || next === "static") {
            classVarDecs += this.compileClassVarDec();
            next = this.tokens[0].value;
        }
        // compile zero or more subroutines
        var subroutines = "";
        while ( next === 'constructor' ||
                next === 'method' ||
                next === 'function' ) {

                    subroutines += this.compileSubroutineDec();

                    next= this.tokens[0].value;
                }
        return templates.klass(className, classVarDecs, subroutines);
    };

    this.compileDo = function() {
        this.eat('keyword'); // do
        var subCall = this.compileSubroutineCall();
        this.eat('symbol') // ;
        return templates.do( subCall );
    };

    this.compileTerm = function() {
        var nextToken = this.tokens[0];
        if (this.isUnaryOp(nextToken.value)) {
            var op = this.eat('symbol').value;
            var term = this.compileTerm();
            return templates.unaryOp(op, term);

        }
        else if (nextToken.category === 'integerConstant') {
            var int = this.eat('integerConstant').value;
            return term = templates.term('integerConstant', int);

        }
        else if (nextToken.category === 'stringConstant') {
            var text = this.eat('stringConstant').value;
            return templates.term('stringConstant', text);

        }

        else if (nextToken.category === 'keyword') {
            var kw = this.eat('keyword').value;
            return templates.term('keyword', kw);
        }
        else if (this.tokens[0].value === '(') {
            this.eat('symbol'); // (
            var exp = this.compileExpression()
            this.eat('symbol'); // )
            var parExp = templates.parenthesisExp(exp);
            return "<term>\n" + parExp + "</term>\n"
            
        }

        else if (this.isIdentifier(nextToken.category)) {
            // next token is identifier
            // could be array access, sub call, or varname

            if ((this.tokens.length > 1)  && this.tokens[1].value === '[') {
                var ident = this.eat('identifier').value;
                this.eat('symbol'); // [
                var expr = this.compileExpression();
                this.eat('symbol');
                return templates.arrayAccess(ident, expr);
            }
            else if ( (this.tokens.length > 1) &&
                      ((this.tokens[1].value === '.' ||
                        this.tokens[1].value === '(')) ) {
                // subCall
                // ?? igual que en un call normal o diferente
                // por ser una expresion??
                return this.compileSubroutineCall();

            }

            else {
                // var name
                var i = this.eat('identifier');
                return templates.term( 'identifier', i.value );
            }
        }
    };
    this.compileExpression = function() {
        var term = this.compileTerm();
        if (this.tokens.length > 0 && this.isOp(this.tokens[0].value)) {
            var op = this.eat('symbol').value;
            var term2 = this.compileTerm();
            return templates.expressionWithOp(term, op, term2);
        }
        return templates.expression( term );
    };

    this.compileSubroutineCall = function() {
        var i1 = this.eat('identifier');
        var i2 = {};
        var sym = this.eat('symbol'); // . or (
        if (sym.value === '.') {
            i2 = this.eat('identifier');
            this.eat('symbol') // (
        }
        var expressions = this.compileExpressionList();
        this.eat('symbol') // )
        return templates.subroutineCall(i1.value, i2.value, expressions);
    };

    this.isUnaryOp = function(tokenVal) {
        return (tokenVal === '~' || tokenVal === '-');
    };

    this.isOp = function(tokenVal) {
        var re = /[/+/-/\/*&///|<>=]/;
        return re.test(tokenVal);
    };

    this.isInt = function(tokenVal) {
        return tokenVal.match(/[0-9]+/);
    };

    this.isIdentifier = function(tokenType) {
        return tokenType === 'identifier';
    }

    this.compileStatement = function() {
        var nextToken = this.tokens[0].value;
        if ( nextToken === 'let') return this.compileLet();
        else if ( nextToken === 'do') return this.compileDo();
        else if (nextToken === 'return') return this.compileReturn();
        else if (nextToken === 'if') return this.compileIf();
        else if (nextToken === 'while') return this.compileWhile();
        else throw new Error("Expected Statement, got " + nextToken);
    };

    this.compileStatements = function() {
        var statements = "";
        while ( this.tokens.length && this.tokens[0].category === 'keyword' ) {
            statements += this.compileStatement();
        };
        return templates.statements( statements );
    };
    this.compileExpressionList = function() {
        
        console.log(this.tokens);
        var expressions = [];
        var nextToken = this.tokens[0];
        while (nextToken.value !== ')') {
            var exp = this.compileExpression();
            expressions.push(exp);
            if (this.tokens[0].value === ')') break;
            else if (this.tokens[0].value === ',') {
                this.eat("symbol");
                expressions.push("<symbol> , </symbol>\n");
                nextToken = this.tokens[0];
            }
        }
        return templates.expressionList( expressions.join("") );
    };




    // TODO refactor to share with jackTokenizer
    this.saveFile = function( ) {
        var dest = this.getDestination(this.file);
        var str = this.tree;
        str = str.replace(/(^[ \t]*\n)/gm, "")
        fs.writeFile(dest, str , function (err) {
            if (err) return console.log(err);
        });
    };
    this.getDestination = function ( file ) {
        return path.dirname(file) +  "/My" + path.basename( file , '.jack') + '.xml' ;
    };
    this.file = file;
    var tokenizer = new JackTokenizer( file );
    this.tokens = tokenizer.tokens;


}

if (require.main === module) {
    var args =process.argv.slice(2);
    var engine = new CompilationEngine( args[0] );
    engine.tree = engine.compileClass()
    engine.saveFile();


} else {
    module.exports = CompilationEngine;
}
