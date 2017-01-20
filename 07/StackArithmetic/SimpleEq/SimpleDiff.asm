// push constant 7

@8
D=A
@SP
A=M
M=D // *SP=7

@SP
M=M+1 // M = M + 1

// push constant 8
@7
D=A
@SP
A=M
M=D // *SP=7

@SP
M=M+1 // M = M + 1


// diff

@SP
M=M-1

@SP
A=M
D=M

@SP
M=M-1

@SP
A=M
D=D-M

@TRUE
D;JNE
// push false
@-1
D=A
@SP
A=M
M=D

@SP
M=M+1
// goto end

@END
0;JMP
(TRUE)
// push true
@0
D=A
@SP
A=M
M=D

@SP
M=M+1

(END)
