var templates = {

    if: function(expression, statements) {
return `<ifStatement>
  <keyword> if </keyword>
  <symbol> ( </symbol>
  ${expression}
  <symbol> ) </symbol>
  <symbol> { </symbol>
  ${statements}
  <symbol> } </symbol>
</ifStatement>
`},

    while: function(expression, statements) { return `<whileStatement>
  <keyword> while </keyword>
  <symbol> ( </symbol>
  ${expression}
  <symbol> ) </symbol>
  <symbol> { </symbol>
  ${statements}
  <symbol> } </symbol>
</whileStatement>`;
                                            },
    subroutineCall: function(i1, i2, expressions) {
        var first = `<identifier> ${i1} </identifier>`;
        var last = `
<symbol> ( </symbol>
${expressions}
  <symbol> ) </symbol>`
        if (i2) {
            var second  = `
  <symbol> . </symbol>
  <identifier> ${i2} </identifier>`
            return first + second + last;
        }
        else {
            return first + last;
        }
    },
    expressionList: function( expressions ) {
        var first  = "<expressionList>\n";
        var mid = expressions;
        var last = "</expressionList>\r";

        if (expressions !== "") {
            return first + mid +last;
            
        }
        else {
            return first + last;
        }
    },

    subroutineDec: function( scope, retType, name, paramList, body) {
    return "<subroutineDec>\n" +
           "<keyword> " + scope + " </keyword>\n" + 
            retType + "\n" + 
           "<identifier> " + name + " </identifier>\n" + 
           "<symbol> ( </symbol>\n" +
            paramList  + "\n" +
           "<symbol> ) </symbol>\n" +
            body + "\n" +
           "</subroutineDec>\n"
;
    },
    do: function( subroutineCall ) { return `<doStatement>
  <keyword> do </keyword>
  ${subroutineCall}
<symbol>;</symbol>
</doStatement>\n`;
                                   },
    let: function(i1, i2) { return `<letStatement>
  <keyword> let </keyword>
  <identifier> ${i1} </identifier>
  <symbol> = </symbol>
  <expression>
    <term>
      <identifier> ${i2} </identifier>
    </term>
  </expression>
  <symbol> ; </symbol>
</letStatement>
`
                          },

    expression: function(term) {
        var result = "<expression>\n" + term +
                "</expression> \n";
        return result;
                                    },
    return: function( expression ) {
        var first = "<returnStatement>\n" +
                "  <keyword> return </keyword>\n";
        var last = "  <symbol> ; </symbol>\n" +
                "</returnStatement>";


        if (expression) { return first + expression + last; }
        else return first + last;

    },

    unaryOp: function(op, term) {
        var result = "<symbol> " + op + " </symbol>";
        
    },

    statements: function( statements ) { return `<statements>
  ${statements}
</statements>`;
                                       },
    classVarDec: function( isField, type, vars ) {
        var result = "<classVarDec>\n" +
                "  <keyword> " + (isField? "field" : "static" ) + " </keyword>\n" +
                 type + "\n" + 
                vars.map(function(v) {
                    return "<identifier> " + v + " </identifier>\n" ;
                }).join("<symbol> , </symbol>\n") +
                "  <symbol> ; </symbol>\n" +
                "</classVarDec>\r";
        return result;
    },
    parameterList: function( params ) {
        var result = "<parameterList>\n";
        if (params) {
            result +=
                params.map(function(param) {
                    return "<keyword> " + param.type + " </keyword>\n" +
                        "<identifier> " + param.ident + " </identifier>\n";
                }).join("<symbol> , </symbol>\n");
        };
        
        return result + "</parameterList>";
    },

    subBody: function(locals, statements) {

        var first = "<subroutineBody>\n" +
                "  <symbol> { </symbol>\n";
        var second = `${locals}`;
        var last =  `${statements}
                 <symbol> } </symbol>
                </subroutineBody>`;
        if (locals) return first + second + last;
        else return first + last;

    },
    klass: function( className, classVarDecs, subroutines) {
        return ` <class>
  <keyword> class </keyword>
  <identifier> ${className} </identifier>
  <symbol> { </symbol>
  ${classVarDecs ? classVarDecs: ""}
  ${subroutines}  <symbol> } </symbol>
</class>
`

    },
    unaryOp: function(op, term) {
        var result = "<term>\n" +
                "<symbol> " + op + " </symbol>\n" +
                term + 
                "</term>";
        return result;
    },
    expressionWithOp: function(term, op, term2) {
        result = "<expression>\n" +
            term + 
            "<symbol> " + op + " </symbol>\n" +
            term2 +
            "</expression>\n";
        return result;
    },
    term: function(tagName, value) {
        var result = "<term>\n" +
                this.tag(tagName, value) + "\n" + 
                "</term>\n";
        return result;
        
    },
    parenthesisExp: function(exp) {
        var result = "<symbol> ( </symbol>\n" +
                exp +
                "<symbol> ) </symbol>\n";
        return result;
    },
    arrayAccess: function(arrayName, arrayIndex) {
        var result = "<term>\n" +
                "<identifier> " + arrayName + " </identifier>\n" +
                "<symbol> [ </symbol>\n" +
                arrayIndex +
                "<symbol> ] </symbol>\n" +
                "</term>\n";
        return result;
    },
    tag: function(name, value) {
        return "<" + name + "> " + value + " </" + name + ">";
    },
    type: function(tag, typeName) {
        return "<" + tag + "> " + typeName + "</" + tag + ">";
    },
    localVarDec: function(type, idents) {
        var ids = idents.map(function(ident) { return "<identifier>" + ident + "</identifier>\n";}).join("<symbol> , </symbol>");
        
        return `<varDec>
  <keyword> var </keyword>
  ${type}
  ${ids}
<symbol> ; </symbol>
</varDec>
`
    }
}

module.exports = templates;
