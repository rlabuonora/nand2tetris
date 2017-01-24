// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/07/MemoryAccess/BasicTest/BasicTest.tst

load BasicTest.asm,
output-file BasicTest.out,
compare-to BasicTest.cmp,
output-list RAM[0]%D1.6.1 RAM[256]%D1.6.1
            RAM[300]%D1.6.1 RAM[401]%D1.6.1 
            RAM[402]%D1.6.1 RAM[3006]%D1.6.1 RAM[3012]%D1.6.1
            RAM[3015]%D1.6.1 RAM[11]%D1.6.1;

set RAM[0] 256,
set RAM[1] 300,
set RAM[2] 400,
set RAM[3] 3000,
set RAM[4] 3010,

repeat 7 {
  ticktock;
}

output;

repeat 14 {
  ticktock;
}

output;

repeat 7 {
  ticktock;
}  // push constant 21 

output;


repeat 7 {
  ticktock;
} // push constant 22

output;

repeat 14 {
  ticktock;
} // pop argument 2

output;

repeat 14 {
  ticktock;
} // pop argument 2

output; // pop argument 1

repeat 7 {
  ticktock;
} 

output; // push constant 36


repeat 14 {
  ticktock;
} 

output; // pop this 6

repeat 7 {
  ticktock;
} 

output; // push constant 42

repeat 7 {
  ticktock;
} 

output; // push constant 45

repeat 14 {
  ticktock;
} 

output; // pop that 5

repeat 14 {
  ticktock;
} 

output; // pop that 2

repeat 7 {
  ticktock;
} 

output; // push constant 510

repeat 14 {
  ticktock;
} 

output; // pop temp 6

repeat 10 {
  ticktock;
} 

output; // push local 0

repeat 10 {
  ticktock;
} 


output; // push that 5

repeat 14 {
  ticktock;
} 

output; // add

repeat 10 {
  ticktock;
} 

output; // push argument 1

repeat 14 {
  ticktock;
} 

output; // sub

repeat 10 {
  ticktock;
} 

output; // push this 6

repeat 10 {
  ticktock;
} 

output; // push this 6

repeat 14 {
  ticktock;
} 

output; // add

repeat 14 {
  ticktock;
} 

output; // sub

repeat 7 {
  ticktock;
} 

output; // push temp6
repeat 14 {
  ticktock;
} 

output; // add

repeat 9 {
  ticktock;
} 

output; // neg
repeat 8 {
  ticktock;
} 

output; // push constant -472

repeat 9 {
  ticktock;
} 

output; // neg


