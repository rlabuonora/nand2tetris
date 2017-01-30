var fs = require('fs');
var path = require('path');
var CodeWriter = require('./CodeWriter');
var Parser = require('./Parser');

function VMTranslator( sourcePath ) {
    this.files;
    this.objectFileName;
    this.destinationPath;
    // Helpers
    this.getObjectFileNameFromPath = function ( sourcePath ) {
        return sourcePath.substr(sourcePath.lastIndexOf("/")+1, sourcePath.length) +".asm";
    };
    this.getObjectFileNameFromFile = function ( sourcePath ) {
        return path.basename(sourcePath, '.vm') + ".asm";
    };
    this.saveFile = function( assemblerCode ) {
        var dest = this.destinationPath + "/" + this.objectFileName;
        fs.writeFile(dest, assemblerCode , function (err) {
            if (err) return console.log(err);
        });
    };

    this.removeTrailingSlash = function (sourcePath ) {
        if (sourcePath.slice(-1) === "/") return sourcePath.slice(0,-1);
        else return sourcePath;
    };


    this.initializeFromPath = function( sourcePath ) {
        // sets instance variables
        // if is directory
        var stats = fs.statSync( sourcePath );
        if (stats.isDirectory()) {
            this.files = fs.readdirSync( sourcePath )
                .filter(function(file) { return path.extname(file) === ".vm"; })
                .map(function(file) { return sourcePath + "/" + file; });
            this.destinationPath = sourcePath;
            this.objectFileName = this.getObjectFileNameFromPath( sourcePath );
        } // if is a single file
        else if (stats.isFile()) {
            this.files = [ sourcePath ];
            this.destinationPath = path.dirname( sourcePath );
            this.objectFileName = this.getObjectFileNameFromFile( sourcePath );
        }
    }

    this.translateInstructions = function( arr, codeWriter ) {
        // translates an array of instructions
        return arr.reduce(function(a, b) {
            return a.concat(codeWriter.writeAssembly(b));
        }, []);
    };
    this.translate = function() {
        var result;
        var codeWriter = new CodeWriter();
        result = this.files.reduce(function(a, b) {
            var parser = new Parser( b );
            codeWriter.fileName = path.basename(b, ".vm");
            var commands = parser.commands;
            return a.concat(this.translateInstructions(commands, codeWriter));
        }.bind(this), []);
        return result;
    }

    var sourcePath = this.removeTrailingSlash( sourcePath );
    this.initializeFromPath( sourcePath )
    // save to file
    var translation = this.translate();
    this.saveFile(translation.join("\n"));
}


if (require.main === module) {
    var args =process.argv.slice(2);
    var t = new VMTranslator(args[0]);
} else {
    module.exports = VMTranslator;
}
