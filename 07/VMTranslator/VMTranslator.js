var fs = require('fs');
var path = require('path');

function VMTranslator( sourcePath ) {
    this.files;
    this.objectFileName;
    this.destinationPath;
    
    var stats = fs.statSync( sourcePath );
    // if is directory
    if (stats.isDirectory()) {
        this.files = fs.readdirSync( sourcePath ).map(function(file) { return sourcePath + file; });
        this.destinationPath = sourcePath;
        var fileName = getObjectFileNameFromPath( sourcePath );
    }
    else if (stats.isFile()) {
        this.files = [ sourcePath ];
        this.destinationPath = path.dirname( sourcePath );
        this.objectFileName = getObjectFileNameFromFile( sourcePath );
    }

    function saveFile( assemblerCode ) {
        fs.writeFile(this.objectFileName, assemblerCode , function (err) {
            if (err) return console.log(err);
        });        
    }
    // if is a single file
    function getObjectFileNameFromFile( sourcePath ) {
        return "output.asm";
    }
    function getObjectFileNameFromPath( sourcePath ) {
        return "output.asm";
    }

}

module.exports = VMTranslator;
