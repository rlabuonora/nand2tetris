// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/07/StackArithmetic/SimpleAdd/SimpleAndVME.tst

load SimpleAnd.vm,
output-file SimpleAnd.out,
compare-to SimpleAnd.cmp,
output-list RAM[0]%D2.6.2 RAM[256]%D2.6.2;

set RAM[0] 256,

repeat 3 {
  vmstep;
}

output;
