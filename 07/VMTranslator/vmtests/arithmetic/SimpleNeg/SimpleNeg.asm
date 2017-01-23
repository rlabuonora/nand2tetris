@7
D=A // D = 7
@SP
A=M
M=D // *SP=7

@SP
M=M+1 // SP++

@SP
M=M-1 // SP++

@SP
A=M
D=M  // D=*SP

@temp
M=D  // temp = *SP --> pop temp

@temp
D=-M
M=D

@temp
D=M

@SP
A=M
M=D

@SP
M=M+1
