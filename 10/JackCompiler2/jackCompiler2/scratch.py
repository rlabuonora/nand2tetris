import re

KEYWORDS = r"\bclass\b|\bconstructor\b|\bfunction\b|\bmethod\b|\bfield\b|\bstatic\b|\bvar\b|\b\int\b|\bchar\b|\bboolean|\bvoid\b|\btrue\b|\bfalse\b|\bnull\b|\bthis\b|\blet\b|\bdo\b|\bif\b|\belse\b|\bwhile\b|\breturn\b"
SYMBOLS= r"\{|}|\(|\)|\[|]|\*|\+|\.|\||,|;|-|\/|&|<|>|=|~"
STRINGCONSTANT  = r'"[^\\n"]+"'
DECIMAL = r"\b\d{1,5}\b"
IDENTIFIER = r"[a-zA-Z_][a-zA-Z0-9_]*"

text_regexp = "|".join([KEYWORDS, SYMBOLS, DECIMAL, STRINGCONSTANT, IDENTIFIER])

prog = """
class Main {
    function void main() {
        var Array a;
        var int length;
		var int i, sum;
	
		let length = Keyboard.readInt("HOW MANY NUMBERS? ");
		let a = Array.new(length);
		let i = 0;
	
		while (i < length) {
	  	  	let a[i] = Keyboard.readInt("ENTER THE NEXT NUMBER: ");
	  	 	let i = i + 1;
		}
	
		let i = 0;
		let sum = 0;
	
		while (i < length) {
		    let sum = sum + a[i];
	 	   	let i = i + 1;
		}
	
		do Output.printString("THE AVERAGE IS: ");
		do Output.printInt(sum / length);
		do Output.println();
	
		return;
    }
}
"""


comments = r"\/\/.*(\r)?\n|\/\*[\s\S]*?\*\/|\n|\r|\t"
reg_exp = re.compile(comments)
re.sub(reg_exp, "", prog)
