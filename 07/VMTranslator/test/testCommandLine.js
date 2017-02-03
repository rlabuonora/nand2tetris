var assert = require('assert');
var fs = require('fs');
var VMTranslator = require('../VMTranslator');


describe('Translate commands', function() {

    var vmRunner   = `
                     load SimpleAdd.vm,
                     output-file SimpleAdd.out,
                     compare-to SimpleAdd.cmp,
                     output-list RAM[0]%D2.6.2 RAM[256]%D2.6.2;

                     set RAM[0] 256,

                     repeat 3 {
                       vmstep;
                     }
                     output;
                     `;

    var cpuRunner = `
                    load SimpleAdd.asm,
                    output-file SimpleAdd.out,
                    compare-to SimpleAdd.cmp,
                    output-list RAM[0]%D2.6.2 RAM[256]%D2.6.2;

                    set RAM[0] 256,

                    repeat 60 {
                      ticktock;
                    }

                    output;
                    `;

    it('works', function() {
        
        
        // turn vm commands into vm script & return the number of commands
        var file = "../../SimpleAdd/SimpleAdd.vm";
        // turn vm commands into asm script & return the number of commands
        
        // run vm script

        // run cpu script

        // compare results

        
        
    });
});
