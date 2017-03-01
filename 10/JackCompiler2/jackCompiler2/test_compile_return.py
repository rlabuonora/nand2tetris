
from JackCompiler import JackCompiler
import unittest


def read_program(source):
    with open(source, 'r') as myfile:
        data=myfile.read()
    return  data

def remove_whitespace(str):
    return str.replace(" ", "").replace("\n", "")

class TestReturnStatement(unittest.TestCase):
    def test_return_statement(self):
        prog = 'return;'
        actual = JackCompiler(prog).compile_statement()
        expected ="""
<returnStatement>
<keyword> return </keyword>
<symbol> ; </symbol>
</returnStatement>
"""
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))



if __name__ == '__main__':
    unittest.main()
