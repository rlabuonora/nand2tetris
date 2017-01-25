load SimpleLT.asm,
output-file SimpleLT.out,
compare-to SimpleLT.cmp,
output-list RAM[0]%D2.6.2 RAM[256]%D2.6.2;

set RAM[0] 256,

repeat 38 {
  ticktock;
}
output;



