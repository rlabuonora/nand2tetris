2// function Sys.init 0
(Sys.init)
// call Sys.main 0
  // push return address
@Sys.init.ret.0
D=A
@SP
A=M
M=D
@SP
M=M+1

// save LCL
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1

// save ARG
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
// save THIS
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
// save THAT
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
// reposition ARG
@SP
D=M
@5
D=D-A
@0 // should be n-args! CHANGE!!
D=D-A
@ARG
M=D
// LCL = SP
@SP
D=M
@LCL
M=D  // this is instr 47
@Sys.main
0;JMP // go to function name
(Sys.init.ret.0)
// pop temp 1
@6
D=A
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
// label LOOP
(LOOP)
// goto LOOP
@LOOP
0;JMP

// function Sys.main 0
(Sys.main)
// push 0 local parameters 
// push constant 123
@123
D=A
@SP
A=M
M=D
@SP
M=M+1 // 56
// call Sys.add12 1
  // push return address
@Sys.main.ret.0
D=A
@SP
A=M
M=D
@SP
M=M+1
// save LCL
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1

// save ARG
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
// save THIS
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
// save THAT
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
// reposition ARG
@SP
D=M
@5
D=D-A
@1 // should be n-args! CHANGE!!
D=D-A
@ARG
M=D
// LCL = SP
@SP
D=M
@LCL
M=D
@Sys.add12
0;JMP // go to function name
(Sys.main.ret.0) // 116
// end of call Sys.add12 1
// pop temp 0
@5
D=A
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
// push constant 246
@246
D=A
@SP 
A=M
M=D
@SP
M=M+1
// return
// endFrame = LCL // line 238 @1; D=M, @17...
@LCL
D=M 
@endFrame
M=D
// retAddr = *(endFrame - 5)
@endFrame
D=M
@5
A=D-A
D=M
@retAddr
M=D
// *ARG = pop()
@SP
M=M-1
A=M
D=M
@ARG
A=M
M=D
// SP = ARG+1
@ARG
D=M+1
@SP
M=D
// THAT = *(endFrame - 1) 
@endFrame
D=M
@1
A=D-A
D=M
@THAT
M=D
// THIS = *(endFrame - 2)
@endFrame
D=M
@2
A=D-A
D=M
@THIS
M=D
// ARG = *(endFrame - 3)
@endFrame
D=M
@3
A=D-A
D=M
@ARG
M=D
// LCL = *(endFrame - 4)
@endFrame
D=M
@4
A=D-A
D=M
@LCL
M=D
// goto return place
@retAddr
A=M
0;JMP

// function Sys.add12 3
(Sys.add12)
// push 3 local params
// push constant 0
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 0
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
// push constant 0
@0
D=A
@SP
A=M
M=D
@SP
M=M+1
// push argument 0
@0
D=A
@ARG
A=D+M
D=M
@SP
A=M
M=D
@SP
M=M+1
// push constant12
@12
D=A
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
// return
// endFrame = LCL // line 242 @1; D=M, @17...
@LCL
D=M 
@endFrame
M=D
// retAddr = *(endFrame - 5)
@endFrame
D=M
@5
A=D-A
D=M
@retAddr
M=D
// *ARG = pop()
@SP
M=M-1
A=M
D=M
@ARG
A=M
M=D
// SP = ARG+1
@ARG
D=M+1
@SP
M=D
// THAT = *(endFrame - 1) // LINE 260 in ROM
@endFrame
D=M
@1
A=D-A
D=M
@THAT
M=D
// THIS = *(endFrame - 2)
@endFrame
D=M
@2
A=D-A
D=M
@THIS
M=D
// ARG = *(endFrame - 3)
@endFrame
D=M
@3
A=D-A
D=M
@ARG
M=D
// LCL = *(endFrame - 4)
@endFrame
D=M
@4
A=D-A
D=M
@LCL
M=D
// goto return place
@retAddr
A=M
0;JMP
