assert = require('assert');
var VMTranslator = require('../VMTranslator');

describe('VMTranslator', function() {
    describe('translate file', function() {
        it('should create an asm file if the file exists', function() {
            // asm filename is the directory
            var file = './test/support/singleFile/singleFile.vm';
            var t1 = new VMTranslator( file );
            assert.deepEqual(t1.files, ['./test/support/singleFile/singleFile.vm']);
            assert.equal(t1.destinationPath, './test/support/singleFile');
            assert.equal(t1.objectFileName, 'singleFile.asm');
            
        });
        it('should throw an error if the file/dir does not exist', function() {
            var file = './test/support/singleFile/WRONGFILENAME.vm';
            assert.throws(function () { new VMTranslator( file ); }, Error);
        });
        it('should throw an error if the file/dir does not exist', function() {
            var file = './test/support/WRONGDIRNAME/';
            assert.throws(function () { new VMTranslator( file ); }, Error);
        });
    });
    describe('remove trailing slash', function() {

        it("with trailing slash", function() {
            var file = './test/support/multipleFiles/';
            var t1 = new VMTranslator( file );
            assert.equal(t1.removeTrailingSlash(file), './test/support/multipleFiles');
        });
        it("without trailing slash", function() {
            var file = './test/support/multipleFiles';
            var t1 = new VMTranslator( file );
            assert.equal(t1.removeTrailingSlash(file), './test/support/multipleFiles');
        });
     
        
    });
    describe('translate a folder', function() {
        it('should create a file', function() {
            // choose asm filename
            var file = './test/support/multipleFiles';
            var t1 = new VMTranslator( file );
            assert.deepEqual(t1.files, [
                './test/support/multipleFiles/firstFile.vm',
                './test/support/multipleFiles/secondFile.vm'
            ]);
            assert.equal(t1.destinationPath, file);
            assert.equal(t1.objectFileName, 'multipleFiles.asm');
            // assert(fs.existsSync('./test/support/multipleFiles/multipleFiles.asm'));
        });
        // how do I test that I have read all the files in the folder
        // TODO use translation to make sure we translate all of the files
        
    });
});
