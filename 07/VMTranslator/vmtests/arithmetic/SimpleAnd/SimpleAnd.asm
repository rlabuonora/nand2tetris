// push constant true
D=-1
@SP
A=M
M=D
@SP
M=M+1
// push constant true
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
D=D&M

// if d == 0 goto push false
@FALSE
D;JEQ 
  // push true
@SP
A=M
M=-1
@SP
M=M+1
  // goto endif
@END_IF
0;JMP
(FALSE)
  // push false
  @SP
  A=M
  M=0
  @SP
  M=M+1
// end if  
(END_IF)
// push constant false
D=0
@SP
A=M
M=D
@SP
M=M+1
// and
@SP
M=M-1
@SP
A=M
D=M
@SP
M=M-1
@SP
A=M
D=D&M

// if d == 0 goto push false
@FALSE2
D;JEQ 
  // push true
@SP
A=M
M=-1
@SP
M=M+1
  // goto endif
@END_IF2
0;JMP
(FALSE2)
  // push false
  @SP
  A=M
  M=0
  @SP
  M=M+1
// end if  
(END_IF2)


