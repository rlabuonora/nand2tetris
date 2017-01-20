// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/07/StackArithmetic/SimpleEq/SimpleEq.tst


load SimpleEq.asm,
output-file SimpleEq.out,
compare-to SimpleEq.cmp,
output-list RAM[0]%D2.6.2 RAM[256]%D2.6.2;

set RAM[0] 256,

repeat 60 {
  ticktock;
}

output;
