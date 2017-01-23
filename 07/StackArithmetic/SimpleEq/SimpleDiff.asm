// push constant 8

@8
D=A
@SP
A=M
M=D // *SP=8

@SP
M=M+1 // M = M + 1

// push constant 7
@7
D=A
@SP
A=M
M=D // *SP=7

@SP
M=M+1 // M = M + 1


// diff
// pop into D
@SP
M=M-1

@SP
A=M
D=M

// pop changing sign
@SP
M=M-1

@SP
A=M
D=D-M
// if d != 0 goto push true
@PUSH_TRUE
D;JNE
// push false
@-1
D=A
@SP
A=M
M=D
@SP
M=M+1
// goto end if
@END_IF
0; JMP
// push true
(PUSH_TRUE)
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
(END_IF)



















// end if
(END_IF)
