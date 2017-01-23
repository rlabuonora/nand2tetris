// push constant 10
@99
@10
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop local 0
@99
@0
D=A
@LCL
D=D+M
@addr
M=D  // addr = LCL+0

@SP
M=M-1
@SP
A=M
D=M  // SP--; D=*SP

@addr
A=M
M=D

// push constant 21
@99
@21
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 22
@99
@22
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop argument 2
@99
@2
D=A
@ARG
D=D+M // CAREFULL D+M, not D+A D=*LCL+2
@addr
M=D // addr = *ARG+2
@SP
M=M-1
@SP
A=M
D=M
@addr
A=M
M=D

// pop argument 1
@99
@1
D=A
@ARG
D=D+M // CAREFULL D+M, not D+A D=*LCL+2
@addr
M=D // addr = *ARG+2
@SP
M=M-1
@SP
A=M
D=M
@addr
A=M
M=D

// push constant 36
@99
@36
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop this 6
@99
@6
D=A
@THIS
D=D+M
@addr
M=D  // addr = RAM[THIS]+6

@SP
M=M-1
@SP
A=M
D=M
@addr
A=M
M=D

// push constant 42
@99
@42
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 45
@99
@45
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop that 5  WRONG!!!
@99
@5
D=A
@THAT
D=D+M
@addr
M=D // addr = RAM[THAT] + 5
@SP
M=M-1
@SP
A=M
D=M
@addr
M=D




// pop that 5
// @99
// @5
// D=A
// @THAT
// D=D+M
// @addr
// M=D // addr = THAT+5
// @SP
// M=M-1
// @SP
// A=M
// D=M
// @addr
// A=M
// M=D

// // pop that 2
// @99
// @2
// D=A
// @THAT
// D=D+M
// @addr
// M=D // addr = THAT+2
// @SP
// M=M-1
// @SP
// A=M
// D=M
// @addr
// A=M
// M=D
// push constant 510
@99
@510
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop temp 6
@99
@6
D=A
@5
D=D+A
@addr
M=D
@SP
M=M-1
@SP
A=M
D=M
@addr
A=M
M=D
// push local 0
@101
@0
D=A
@LCL
A=M
D=D+M  // D=RAM[LCL]+0 SILLY BEST DONE BELOW!
A=D
D=M  // D=
@SP
A=M
M=D

@SP
M=M+1 // SP++
// push that 5
@99

@5
D=A
@THAT
A=D+M // A=RAM[THAT] + 5
D=M  
@SP
A=M
M=D

@SP
M=M+1 // SP++

// add
@99
@SP
M=M-1
@SP
A=M
D=M

@SP
M=M-1
@SP
A=M
D=D+M

@SP
A=M
M=D
@SP
M=M+1
// push argument 1
@99
@1
D=A
@ARG
A=D+M
D=M
@SP
A=M
M=D
@SP
M=M+1
// sub@99
@99
// pop into D
@SP
M=M-1
@SP
A=M
D=M
// pop into D combining
@SP
M=M-1
@SP
A=M
D=M-D
// push D
@SP
A=M
M=D
@SP
M=M+1


// push this 6
@99
@6
D=A
@THIS
A=D+M
D=M
@SP
A=M
M=D
@SP
M=M+1
// push this 6
@99
@6
D=A
@THIS
A=D+M
D=M
@SP
A=M
M=D
@SP
M=M+1
// add
@99
@SP
M=M-1
@SP
A=M
D=M

@SP
M=M-1
@SP
A=M
D=D+M

@SP
A=M
M=D
@SP
M=M+1
// sub
@99
// pop into D
@SP
M=M-1
@SP
A=M
D=M
// pop into D combining
@SP
M=M-1
@SP
A=M
D=M-D
// push D
@SP
A=M
M=D
@SP
M=M+1
// push temp 6
@99
@6
D=A
@5
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1
// add
@99
@SP
M=M-1
@SP
A=M
D=M

@SP
M=M-1
@SP
A=M
D=D+M

@SP
A=M
M=D
@SP
M=M+1
