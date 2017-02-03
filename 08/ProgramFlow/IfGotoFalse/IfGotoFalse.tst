load IfGotoFalse.asm,
output-file IfGotoFalse.out,
compare-to IfGotoFalse.cmp,
output-list RAM[0]%D1.6.1 RAM[256]%D1.6.1;

set RAM[0] 256,



repeat 600 {
  ticktock;
}

output;
