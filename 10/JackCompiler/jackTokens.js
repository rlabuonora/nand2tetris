var jackTokens = {

    keywords:/\bclass\b|\bconstructor\b|\bfunction\b|\bmethod\b|\bfield\b|\bstatic\b|\bvar\b|\b\int\b|\bchar\b|\bboolean|\bvoid\b|\btrue\b|\bfalse\b|\bnull\b|\bthis\b|\blet\b|\bdo\b|\bif\b|\belse\b|\bwhile\b|\breturn\b/ ,

    symbols: /\{|}|\(|\)|\[|]|\*|\+|\.|\||,|;|-|\/|&|<|>|=|~/,

    stringConstant: /"[^\\n"]+"/,  // a sequence of unicode excluding " and \n

    decimal: /\b\d{1,5}\b/,  // TODO: test size

    identifier: /[a-zA-Z_][a-zA-Z0-9_]*/,

    writeXML: function( token ) {

        // helper to print XML tags
        var xmlTag = function( tokenObject ) {
            return "<" + tokenObject.category + "> "  + tokenObject.value + " </" + tokenObject.category + ">";
        };

        return xmlTag(  token );
    },
    makeObj: function( token ) {
        var htmlEntities = function( str ) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        };
        if ( token.match(this.symbols) ) {
            return { category: "symbol", value: htmlEntities(token) };
        }
        else if (token.match(this.keywords)) {
            return { category: "keyword", value: token };
        }
        else if (token.match( this.stringConstant )) {
            return { category: "stringConstant" ,
                     value: token.substr(1).slice(0, -1) };
        }
        else if ( token.match(this.identifier) ) {
            
            return { category: "identifier", value: token };
        }
        else if (token.match(this.decimal)) {
            // TODO check less than 32450
            return { category: "integerConstant", value: token };

        }
    },


}




module.exports = jackTokens;
