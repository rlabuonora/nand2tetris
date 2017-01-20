// push constant 7

@7
D=A
@SP
A=M
M=D // *SP=7

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


// eq
@SP
M=M-1 // SP--

@SP
A=M
D=M // D = *SP


@SP
M=M-1 // SP --

@SP
A=M
D=D-M // D=D-*SP

// if D != 0 goto NEQ
@NEQ
D;JNE
// push true
@0
D=A // D=0
@SP
A=M
M=D // *SP = D
@SP
M=M+1 // SP ++

@END
0;JMP // GOTO END

(NEQ)
// push false
@-1
D=A // D=-1
@SP
A=M
M=D // *SP = D
@SP
M=M+1 // SP ++

(END)
// push constant 8
