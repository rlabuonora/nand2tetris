// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input. 
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel. When no key is pressed, the
// program clears the screen, i.e. writes "white" in every pixel.


// Put your code here.
(WAIT_KEYDOWN)
@KBD
D=M
@FILL_BLACK
D;JGT  // if RAM[KBD] > 0 GOTO FILL BLACK
@WAIT_KEYDOWN
0;JMP  // GOTO WAIT



(FILL_BLACK)
@8192
D=A
@n
M=D  // n = 8192

@i
M=0 // i = 0

(LOOP)
@i
D=M
@n
D=D-M // D=i-n
@STOP
D;JGT // if i-n > 0 GOTO STOP

@SCREEN
D=A
@i
D=D+M // D=SCREEN+i
A=D
M=-1 // RAM[SCREEN+i] = -1

@i
M=M+1 // i = i + 1
@LOOP
0; JMP // GOTO LOOP

(STOP)
@STOP
0; JMP

