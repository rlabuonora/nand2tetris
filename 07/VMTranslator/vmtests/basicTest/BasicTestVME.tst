// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/07/MemoryAccess/BasicTest/BasicTestVME.tst

load BasicTest.vm,
output-file BasicTest.cmp,
output-list RAM[0]%D1.6.1 RAM[256]%D1.6.1 RAM[300]%D1.6.1 RAM[401]%D1.6.1 
            RAM[402]%D1.6.1 RAM[3006]%D1.6.1 RAM[3012]%D1.6.1
            RAM[3015]%D1.6.1 RAM[11]%D1.6.1;

set sp 256,
set local 300,
set argument 400,
set this 3000,
set that 3010;


vmstep;
output; // push constant 0
vmstep; 
output; // pop local 0
vmstep;
output; // push constant 21
vmstep;
output; // push constant 22
vmstep;
output; // pop argument 2

vmstep;
output; // pop argument 1

vmstep;
output; // push constant 36

vmstep;
output; // pop this 6
vmstep;
output; // push constant 42
vmstep;
output; // push constant 46

vmstep;
output; // pop that 5

vmstep;
output; // pop that 2

vmstep;
output; // push constant 510

vmstep;
output; // pop temp 6

vmstep;
output; // push local 0

vmstep;
output; // push that 5

vmstep;
output; // add

vmstep;
output; // push argument 1

vmstep;
output; // sub

vmstep;
output; // push this 6

vmstep;
output; // push this 6

vmstep;
output; // add

vmstep;
output; // sub

vmstep;
output; // push temp 6

vmstep;
output; // add

vmstep;
output; // neg

vmstep;
output; // push constant -472








