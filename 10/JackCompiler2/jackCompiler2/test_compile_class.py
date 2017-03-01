from JackCompiler import JackCompiler
import unittest

def read_program(source):
    with open(source, 'r') as myfile:
        data=myfile.read()
    return  data

def remove_whitespace(str):
    return str.replace(" ", "").replace("\n", "")


class TestCompileParamList(unittest.TestCase):

    def test_empty_param_list(self):
        prog = ""
        expected = "<parameterList>\n</parameterList>\n"
        actual = JackCompiler(prog).compile_param_list()
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))


    def test_one_param(self):
        expected = """
<parameterList>
<keyword> int </keyword>
<identifier> Ax </identifier>
</parameterList>
"""
        prog = "int Ax"
        actual = JackCompiler(prog).compile_param_list()
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

    def test_three_params(self):
        expected = """
<parameterList>
<keyword> int </keyword>
<identifier> Ax </identifier>
<symbol> , </symbol>
<keyword> int </keyword>
<identifier> Ay </identifier>
<symbol> , </symbol>
<keyword> int </keyword>
<identifier> Asize </identifier>
</parameterList>
"""
        prog = "int Ax, int Ay, int Asize";
        actual = JackCompiler(prog).compile_param_list()
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
        
class TestCompileVarDec(unittest.TestCase):
    def test_single_var_dec(self):
        prog = "field int x;";
        expected = """
<classVarDec>
  <keyword> field </keyword>
  <keyword> int </keyword>
  <identifier> x </identifier>
  <symbol> ; </symbol>
</classVarDec>
"""
        actual = JackCompiler(prog).compile_class_var_dec()
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
        
    def test_class_var_decs(self):
        prog = "field int x, y;";
        expected = """
<classVarDec>
  <keyword> field </keyword>
  <keyword> int </keyword>
  <identifier> x </identifier>
  <symbol> , </symbol>
  <identifier> y </identifier>
  <symbol> ; </symbol>
</classVarDec>
"""
        actual = JackCompiler(prog).compile_class_var_dec()
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

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
