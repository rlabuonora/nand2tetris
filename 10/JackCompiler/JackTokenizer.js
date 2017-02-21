var path = require('path');
var fs  = require('fs');
var jackTokens = require('./jackTokens');

function JackTokenizer( file ) {

    this.openFile =  function( file ) {
        try {
            return fs.readFileSync(file, 'utf8');
        } catch(e) {
            console.log("Error", e.stack);
        }
    };

    this.removeComments =  function( program ) {
        var re = /\/\/.*(\r)?\n|\/\*[\s\S]*?\*\/|\n|\r|\t/g;
        return program.replace(re, "");
    };
    this.split = function( program ) {
        var regs = [ jackTokens.keywords, jackTokens.symbols,
                     jackTokens.stringConstant, jackTokens.decimal,
                     jackTokens.identifier ];

        var re = new RegExp(regs.map(
            function(reg) { return reg.source; }
        ).join('|'), "g");
        return program.match(re);
    };
    this.toXML = function( tokens ) { // receives an array of token objects
        var xml = tokens.map(function(token) {
            return jackTokens.writeXML(token);
        });
        return "<tokens>\n" + xml.join("\n") + "\n</tokens>\n";

    };
    this.tokenize = function( prog ) {
        // returns token objects
        var arr =  this.split(this.removeComments( prog ));
        return arr.map( function(token) {
            return jackTokens.makeObj(token) }
                      );
    };
    this.getDestination = function ( file ) {
        return path.dirname(file) +  "/My" + path.basename( file , '.jack') + 'T.xml' ;
    };
    this.saveFile = function( ) {
        var xml = this.toXML( this.tokens );
        fs.writeFile(this.dest, xml , function (err) {
            if (err) return console.log(err);
        });
    };
    if (file) { // can be instantiated with no file
        this.dest = this.getDestination( file );
        var prog = this.openFile( file );
        this.tokens = this.tokenize( prog );
    }


};

if (require.main === module) {
    var args = process.argv.slice( 2 );
    var t = new JackTokenizer( args[0] );
    t.saveFile();

} else {
    module.exports = JackTokenizer;
}
