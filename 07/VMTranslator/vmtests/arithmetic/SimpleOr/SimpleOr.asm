// push constant false
D=0
@SP
A=M
M=D
@SP
M=M+1
// push constant false
D=0
@SP
A=M
M=D
@SP
M=M+1
// and
  // pop into D
@SP
M=M-1
@SP
A=M
D=M
  // pop into D and combine
@SP 
M=M-1
@SP
A=M
D=D|M
D=-D

@SP
A=M
M=D
@SP
M=M+1

// push constant false
D=-1
@SP
A=M
M=D
@SP
M=M+1
// and
// pop into D
@SP
M=M-1
@SP
A=M
D=M
  // pop into D and combine
@SP 
M=M-1
@SP
A=M
D=D|M
D=-D

@SP
A=M
M=D
@SP
M=M+1
 
        
