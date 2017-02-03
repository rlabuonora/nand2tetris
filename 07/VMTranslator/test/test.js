var assert = require('assert');
var fs = require('fs');
var VMTranslator = require('../VMTranslator');
var Parser = require('../Parser');
var CodeWriter = require('../CodeWriter');

describe('VMTranslator', function() {
    describe('translate file', function() {
        it('should create an asm file if the file exists', function() {
            // asm filename is the directory
            var file = './test/support/singleFile/singleFile.vm';
            var t1 = new VMTranslator( file );
            assert.deepEqual(t1.files, ['./test/support/singleFile/singleFile.vm']);
            assert.equal(t1.destinationPath, './test/support/singleFile');
            assert.equal(t1.objectFileName, 'singleFile.asm');
            var destFile = './test/support/singleFile/singleFile.asm';
            // assert that file exists
            assert(fs.existsSync(destFile));
            // clean up file
            fs.unlinkSync(destFile);

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
            var file = './test/support/multipleFiles/multipleFiles.asm';
            assert(fs.existsSync(file));
            fs.unlinkSync(file);
        });
        
    });

    describe('translate and array of instructions', function() {
        it('should return an array', function() {
            var file = './test/support/singleFile/singleFile.vm';
            var translator = new VMTranslator( file );
            var actual = translator.translate();
            var expected = [ "// push constant 0", "@0", "D=A", "@SP", "A=M", "M=D", "@SP", "M=M+1" ];

            assert.deepEqual(actual, expected);
        });
    });
    describe('cpu instructions', function() {
        it('Simple Add', function() {
            var file = '../StackArithmetic/SimpleAdd/SimpleAdd.vm';
            var actual = new VMTranslator( file ).cpuInstructions;;
            var expected = 27;
            assert.equal(actual, expected);
        });
        it('Nested Call', function() {
            var file = '../../08/FunctionCalls/NestedCall/NestedCall.vm';
            var actual = new VMTranslator( file ).cpuInstructions;;
            var expected = 295;
            assert.equal(actual, expected);
        });
    });

});
