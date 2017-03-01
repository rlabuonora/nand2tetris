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

class TestLocalVariables(unittest.TestCase):

        def test_local_var_dec(self):
            prog = "var int x;"
            expected = """ 
<varDec>
<keyword> var </keyword>
<keyword> int </keyword>
<identifier> x </identifier>
<symbol> ; </symbol>
</varDec>
"""
            actual = JackCompiler(prog).compile_local_var_dec()
            self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
        def test_local_var_decs(self):
            prog = "var int x, y, z;"
            actual = JackCompiler(prog).compile_local_var_dec()
            expected = """
    <varDec>
<keyword> var </keyword>
<keyword> int </keyword>
<identifier> x </identifier>
<symbol> , </symbol>
<identifier> y </identifier>
<symbol> , </symbol>
<identifier> z </identifier>
<symbol> ; </symbol>
</varDec>
"""
            self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

            
        def test_class_types(self):
            prog = "var Point x, y, z;"
            actual = JackCompiler(prog).compile_local_var_dec()
            expected = """
<varDec>
  <keyword> var </keyword>
  <identifier> Point </identifier>
  <identifier> x </identifier>
  <symbol> , </symbol>
  <identifier> y </identifier>
  <symbol> , </symbol>
  <identifier> z </identifier>
  <symbol> ; </symbol>
</varDec>
"""
            self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))            
            

class TestSubroutineBody(unittest.TestCase):

    def test_no_local_variables(self):
        prog = """
{
  do Memory.deAlloc(x);
  return ;
}
"""
        expected = """
<subroutineBody>
<symbol> { </symbol>
<statements>
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
<returnStatement>
<keyword> return </keyword>
<symbol> ; </symbol>
</returnStatement>
</statements>
<symbol> } </symbol>
</subroutineBody>
"""
        actual = JackCompiler(prog).compile_subroutine_body()
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

    def test_subroutine_body(self):
        prog = """
{
  var int x;
  return;
}
"""
        expected = """
<subroutineBody>
  <symbol> { </symbol>
  <varDec>
    <keyword> var </keyword>
    <keyword> int </keyword>
    <identifier> x </identifier>
    <symbol> ; </symbol>
  </varDec>
  <statements>
   <returnStatement>
     <keyword> return </keyword>
     <symbol> ; </symbol>
    </returnStatement>
  </statements>
  <symbol> } </symbol>
</subroutineBody>
"""
        actual = JackCompiler(prog).compile_subroutine_body()
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))


    def test_no_args(self):
            prog = """
method void dispose() {
  do Memory.deAlloc(x);
  return;
}
"""
            expected = """
<subroutineDec>
<keyword> method </keyword>
<keyword> void </keyword>
<identifier> dispose </identifier>
<symbol> ( </symbol>
<parameterList>
</parameterList>
<symbol> ) </symbol>
<subroutineBody>
<symbol> { </symbol>
<statements>
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
<returnStatement>
<keyword> return </keyword>
<symbol> ; </symbol>
</returnStatement>
</statements>
<symbol> } </symbol>
</subroutineBody>
</subroutineDec>
"""
            actual = JackCompiler(prog).compile_subroutine_dec()
            self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
            
if __name__ == '__main__':
    unittest.main()
