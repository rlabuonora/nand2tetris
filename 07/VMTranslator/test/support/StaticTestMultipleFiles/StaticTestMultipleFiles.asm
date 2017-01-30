// push constant 111
@111
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 333
@333
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 888
@888
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop static 8
@SP
M=M-1
A=M
D=M
@Bar.8
M=D
// pop static 3
@SP
M=M-1
A=M
D=M
@Bar.3
M=D
// pop static 1
@SP
M=M-1
A=M
D=M
@Bar.1
M=D
// push static 3
@undefined.3
D=M
@SP
A=M
M=D
@SP
M=M+1
// push static 1
@undefined.1
D=M
@SP
A=M
M=D
@SP
M=M+1
// sub
@SP
M=M-1
@SP
A=M
D=-M
@SP
M=M-1
A=M
D=D+M
@SP
A=M
M=D
@SP
M=M+1
// push static 8
@undefined.8
D=M
@SP
A=M
M=D
@SP
M=M+1
// add
@SP
M=M-1
@SP
A=M
D=M
@SP
M=M-1
A=M
D=D+M
@SP
A=M
M=D
@SP
M=M+1
// push constant 111
@111
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 333
@333
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 888
@888
D=A
@SP
A=M
M=D
@SP
M=M+1
// pop static 8
@SP
M=M-1
A=M
D=M
@Foo.8
M=D
// pop static 3
@SP
M=M-1
A=M
D=M
@Foo.3
M=D
// pop static 1
@SP
M=M-1
A=M
D=M
@Foo.1
M=D
// push static 3
@undefined.3
D=M
@SP
A=M
M=D
@SP
M=M+1
// push static 1
@undefined.1
D=M
@SP
A=M
M=D
@SP
M=M+1
// sub
@SP
M=M-1
@SP
A=M
D=-M
@SP
M=M-1
A=M
D=D+M
@SP
A=M
M=D
@SP
M=M+1
// push static 8
@undefined.8
D=M
@SP
A=M
M=D
@SP
M=M+1
// add
@SP
M=M-1
@SP
A=M
D=M
@SP
M=M-1
A=M
D=D+M
@SP
A=M
M=D
@SP
M=M+1