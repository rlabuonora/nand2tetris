var fs = require('fs');
var path = require('path');

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

    var sourcePath = this.removeTrailingSlash( sourcePath );
    // constructor code
    var stats = fs.statSync( sourcePath );
    // if is directory
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
    this.saveFile("assembler commands");
}


if (require.main === module) {
    var args =process.argv.slice(2);
    var t = new VMTranslator(args[0]);    
} else {
    module.exports = VMTranslator;
}

