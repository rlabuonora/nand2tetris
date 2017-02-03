// Test file for NestedCall test.

load IfGoto.vm,
output-file IfGoto.cmp,
output-list RAM[0]%D1.6.1 RAM[256]%D1.6.1,

set RAM[0] 256;


repeat 10 {
  vmstep;
}
output;
