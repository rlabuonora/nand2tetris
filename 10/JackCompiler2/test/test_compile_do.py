import unittest, os, sys
sys.path.append(os.path.abspath('../JackCompiler2/jackCompiler2'))
from JackCompiler import JackCompiler
import unittest

def read_program(source):
    with open(source, 'r') as myfile:
        data=myfile.read()
    return  data

def remove_whitespace(str):
    return str.replace(" ", "").replace("\n", "")


class TestCompileDoStatement(unittest.TestCase):
    def test_do_statement(self):
        prog = "do moveSquare();";
        actual = JackCompiler(prog).compile_statement()
        expected =  """<doStatement>
<keyword> do </keyword>
<identifier> moveSquare </identifier>
<symbol> ( </symbol>
<expressionList>
</expressionList>
<symbol> ) </symbol>
<symbol> ; </symbol>
</doStatement>
"""
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

    def test_do_statement_2(self):
            
        prog = "do square.move();";
        actual = JackCompiler(prog).compile_statement()
        expected =  """<doStatement>
<keyword> do </keyword>
<identifier> square </identifier>
<symbol> . </symbol>
<identifier> move </identifier>
<symbol> ( </symbol>
<expressionList>
</expressionList>
<symbol> ) </symbol>
<symbol> ; </symbol>
</doStatement>      
"""            
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
        
    def test_do_statement_3(self):
        prog = "do Memory.deAlloc(x);";
        actual = JackCompiler(prog).compile_statement()
        expected = """
<doStatement>
<keyword> do </keyword>
<identifier> Memory </identifier>
<symbol> . </symbol>
<identifier> deAlloc </identifier>
<symbol> ( </symbol>
<expressionList>
<expression>
<term>
<identifier> x </identifier>
</term>
</expression>
</expressionList>
<symbol> ) </symbol>
<symbol> ; </symbol>
</doStatement>    
"""            
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

    def test_do_statement_4(self):
        prog = "do Memory.deAlloc(x, y);";
        actual = JackCompiler(prog).compile_statement()
        expected = """
<doStatement>
<keyword> do </keyword>
<identifier> Memory </identifier>
<symbol> . </symbol>
<identifier> deAlloc </identifier>
<symbol> ( </symbol>
<expressionList>
<expression>
<term>
<identifier> x </identifier>
</term>
</expression>
<symbol> , </symbol>
<expression>
<term>
<identifier> y </identifier>
</term>
</expression>
</expressionList>
<symbol> ) </symbol>
<symbol> ; </symbol>
</doStatement>
"""            
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
            

if __name__ == '__main__':
    unittest.main()
