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

class TestCompileLetStatement(unittest.TestCase):
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




if __name__ == '__main__':
    unittest.main()

