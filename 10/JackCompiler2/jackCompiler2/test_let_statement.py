from JackCompiler import JackCompiler
import unittest


def read_program(source):
    with open(source, 'r') as myfile:
        data=myfile.read()
    return  data

def remove_whitespace(str):
    return str.replace(" ", "").replace("\n", "")
            
class TestCompileStatement(unittest.TestCase):
    
        def test_let_statement(self):
            prog = 'let x = x;'
            actual = JackCompiler(prog).compile_statement()
            expected ="""
<letStatement>
<keyword> let </keyword>
<identifier> x </identifier>
<symbol> = </symbol>
<expression>
<term>
<identifier> x </identifier>
</term>
</expression>
<symbol> ; </symbol>
</letStatement>
"""
            self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

        def test_let_statement_2(self):
            prog = 'let length = Keyboard.readInt("HOW MANY NUMBERS? ");'
            actual = JackCompiler(prog).compile_statement()
            expected ="""
<letStatement> 
<keyword> let </keyword> 
<identifier> length </identifier> 
<symbol> = </symbol> 
<expression> 
<term> 
<identifier> Keyboard </identifier> 
<symbol> . </symbol> 
<identifier> readInt </identifier> 
<symbol> ( </symbol> 
<expressionList> 
<expression> 
<term> 
<stringConstant> HOW MANY NUMBERS?  </stringConstant> 
</term>
</expression>
</expressionList>
<symbol> ) </symbol> 
</term> 
</expression>
<symbol> ; </symbol> 
</letStatement>
"""
            self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

        
        def test_if_statement_(self):
            prog = "if (key) { let exit = exit;}"
            actual = JackCompiler(prog).compile_statement()
            expected ="""<ifStatement>
<keyword> if </keyword>
<symbol> ( </symbol>
<expression>
<term>
<identifier> key </identifier>
</term>
</expression>
<symbol> ) </symbol>
<symbol> { </symbol>
<statements>
<letStatement>
<keyword> let </keyword>
<identifier> exit </identifier>
<symbol> = </symbol>
<expression>
<term>
<identifier> exit </identifier>
</term>
</expression>
<symbol> ; </symbol>
</letStatement>
</statements>
<symbol> } </symbol>
</ifStatement>
"""
            self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
            
        def test_while_statement(self):
            prog = """
while (key) {
let key = key;
do moveSquare();
}
"""
            actual = JackCompiler(prog).compile_statement()
            expected ="""
<whileStatement>
<keyword> while </keyword>
<symbol> ( </symbol>
<expression>
<term>
<identifier> key </identifier>
</term>
</expression>
<symbol> ) </symbol>
<symbol> { </symbol>
<statements>
<letStatement>
<keyword> let </keyword>
<identifier> key </identifier>
<symbol> = </symbol>
<expression>
<term>
<identifier> key </identifier>
</term>
</expression>
<symbol> ; </symbol>
</letStatement>
<doStatement>
<keyword> do </keyword>
<identifier> moveSquare </identifier>
<symbol> ( </symbol>
<expressionList>
</expressionList>
<symbol> ) </symbol>
<symbol> ; </symbol>
</doStatement>
</statements>
<symbol> } </symbol>
</whileStatement>
"""
            
if __name__ == '__main__':
    unittest.main()
