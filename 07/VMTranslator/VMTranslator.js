var fs = require('fs');
var path = require('path');
var CodeWriter = require('./CodeWriter');
var Parser = require('./Parser');


function VMTranslator( sourcePath ) {
    this.files;
    this.objectFileName;
    this.destinationPath;

    this.saveFile = function( assemblerCode ) {
        var dest = this.destinationPath + "/" + this.objectFileName;
        fs.writeFile(dest, assemblerCode , function (err) {
            if (err) return console.log(err);
        });
    };

    this.initializeFromPath = function( sourcePath ) {

        var removeTrailingSlash = function ( sourcePath ) {
            if (sourcePath.slice(-1) === "/") return sourcePath.slice(0,-1);
            else return sourcePath;
        };
        // Helpers
        var getObjectFileNameFromPath = function ( sourcePath ) {
            return sourcePath.substr(sourcePath.lastIndexOf("/")+1, sourcePath.length) +".asm";
        };
        var getObjectFileNameFromFile = function ( sourcePath ) {
            return path.basename(sourcePath, '.vm') + ".asm";
        };
        // sets instance variables
        // if is directory
        var sourcePath = removeTrailingSlash( sourcePath );
        var stats = fs.statSync( sourcePath );
        if (stats.isDirectory()) {
            this.isDir = true;
            this.files = fs.readdirSync( sourcePath )
                .filter(function(file) { return path.extname(file) === ".vm"; })
                .map(function(file) { return sourcePath + "/" + file; });
            this.destinationPath = sourcePath;
            this.objectFileName = getObjectFileNameFromPath( sourcePath );
        } // if is a single file
        else if (stats.isFile()) {
            this.files = [ sourcePath ];
            this.destinationPath = path.dirname( sourcePath );
            this.objectFileName = getObjectFileNameFromFile( sourcePath );
        }
    }

    this.translate = function() {
        // helper to translate an instruction
        var translateInstructions = function( arr, codeWriter ) {
            // translates an array of instructions
            return arr.reduce(function(a, b) {
                return a.concat(codeWriter.writeAssembly(b));
            }, []);
        };

        var codeWriter = new CodeWriter();
        var translation = this.files.reduce(function(a, b) {
            var parser = new Parser( b );
            codeWriter.fileName = path.basename(b, ".vm");
            var commands = parser.commands;
            return a.concat(translateInstructions(commands, codeWriter));
        }, []);

        if (this.isDir) {
            return codeWriter.bootstrapCode().concat(translation);
        } else {
            return translation;
        }
    }


    this.initializeFromPath( sourcePath )
    // save to file
    var translation = this.translate()
    this.cpuInstructions = translation.filter(function(line) {
        return (line[0] !== "(" && line[0] !== "/");
    }).length - 1;
    
    
    this.saveFile(translation.join("\n"));
}


if (require.main === module) {
    var args =process.argv.slice(2);
    var t = new VMTranslator(args[0]);
} else {
    module.exports = VMTranslator;
}
