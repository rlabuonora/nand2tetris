var fs = require('fs');

function VMTranslator( path ) {
    this.files;

    function getFiles( path ) {
        
        var stats = fs.statSync( path );
        // if is directory
        if (stats.isDirectory()) {
            this.files = fs.readdirSync( path );
        }
        else if (stats.isFile())
            this.files = [ path ];
        // if is a single file
    };

    getFiles( path );
       
}

module.exports = VMTranslator;
