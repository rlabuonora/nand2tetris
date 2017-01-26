load SimpleOr.asm,
output-file SimpleOr.out,
compare-to SimpleOr.cmp,
output-list RAM[0]%D2.6.2 RAM[256]%D2.6.2;

set RAM[0] 256,

repeat 30 {
  ticktock;
}
output;

repeat 30 {

  ticktock;
}

output;
