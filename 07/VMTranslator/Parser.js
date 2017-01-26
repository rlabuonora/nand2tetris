// parses file and returns array
// of instructions (without comments or whitespace)
function Parser( file ) {

    this.commands;

    this.preprocessLine =  function( str ) {
        var re = /\/\/.*\r?$/;
        var newLine = str.replace(re, "").trim();
        return newLine;
    };

    this.readFile = function( file ) {
        // return an array with the lines of the file
        var fs = require('fs');
        return fs.readFileSync(file).toString().split("\n").slice(0, -1); // remove last blank line
    };

    this.preprocessFile = function( file ) {
        var arr = this.readFile(file);
        return arr.map(function(line) {
            return this.preprocessLine(line)
        }.bind(this)).filter(function(line) {
            return line !== "";
        });
    };


    if ( arguments.length > 0 ) {
        this.commands = this.preprocessFile( file );
    } else {
        this.commands = [];
    }
};

module.exports = Parser;
