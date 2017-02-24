from JackCompiler import JackCompiler
import unittest



def read_program(source):
    with open(source, 'r') as myfile:
        data=myfile.read()
    return  data

def remove_whitespace(str):
    return str.replace(" ", "").replace("\n", "")


class TestCompileExpression(unittest.TestCase):

    
    def test_do_statment(self):
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

if __name__ == '__main__':
    unittest.main()
