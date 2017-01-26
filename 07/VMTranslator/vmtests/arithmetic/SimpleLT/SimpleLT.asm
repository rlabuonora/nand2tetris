// push constant 7
@8
D=A
@SP
A=M
M=D
@SP
M=M+1

// push constant 8
@7
D=A
@SP
A=M
M=D
@SP
M=M+1

// gt
// pop y
@SP
M=M-1 // SP--
@SP
A=M
D=M // D=*SP
// pop x
@SP
M=M-1
@SP
A=M
D=M-D // D=x-y

@PUSH_TRUE
D;JLT // if x-y > 0 GOTO PUSH_TRUE
@SP
A=M
M=0
@SP
M=M+1 // *SP = 0
@END_IF
0;JMP
(PUSH_TRUE)
@SP
A=M
M=-1
@SP
M=M+1
(END_IF)


