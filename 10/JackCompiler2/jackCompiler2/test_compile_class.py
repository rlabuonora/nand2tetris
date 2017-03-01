from JackCompiler import JackCompiler
import unittest

def read_program(source):
    with open(source, 'r') as myfile:
        data=myfile.read()
    return  data

def remove_whitespace(str):
    return str.replace(" ", "").replace("\n", "")


class TestCompileClass(unittest.TestCase):

    
    def test_simple_class(self):
        prog = read_program('./support/simpleClass.jack')
        actual = JackCompiler(prog).compile_class()
        expected = read_program('./support/simpleClass.xml')
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

    def test_multiple_var_decs(self):
        prog = read_program('./support/multipleVarDecs.jack')
        actual = JackCompiler(prog).compile_class()
        expected = read_program('./support/multipleVarDecs.xml')
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

    def test_one_var_decs(self):
        prog = read_program('./support/oneVarDecs.jack')
        actual = JackCompiler(prog).compile_class()
        expected = read_program('./support/oneVarDecs.xml')
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))        


if __name__ == '__main__':
    unittest.main()
