from JackCompiler import JackCompiler
import unittest

def read_program(source):
    with open(source, 'r') as myfile:
        data=myfile.read()
    return  data

def remove_whitespace(str):
    return str.replace(" ", "").replace("\n", "")
    
    
class TestCompileExpression(unittest.TestCase):

    # Helpers
    def test_var_name(self):
        prog = 'x'
        actual = JackCompiler(prog).compile_expression()
        expected = """<expression>
  <term>
    <identifier> x </identifier>
  </term>
</expression>
"""
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
    
    def test_unary_op(self):
        prog = '~x'
        actual = JackCompiler(prog).compile_expression()
        expected = """<expression>
  <term>
    <symbol> ~ </symbol>
    <term>
      <identifier> x </identifier>
    </term>
  </term>
</expression>
"""
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
        
        
    
    def test_binary_op(self):
        prog = 'x + size'
        actual = JackCompiler(prog).compile_expression()
        expected = """<expression>
  <term>
    <identifier> x </identifier>
  </term>
  <symbol> + </symbol>
  <term>
    <identifier> size </identifier>
  </term>
</expression>
"""
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
        

    def test_integer_constant(self):
        prog = '1'
        actual = JackCompiler(prog).compile_expression()
        expected = """<expression>
  <term>
    <integerConstant> 1 </integerConstant>
  </term>
</expression>
"""
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

    def test_string_constant(self):
        prog = '"algo"'
        actual = JackCompiler(prog).compile_expression()
        expected = """<expression>
  <term>
    <stringConstant> algo  </stringConstant>
  </term>
</expression>
"""
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

    @unittest.skip("not implemented")
    def test_expression_list(self):
        prog = 'x, (y + size) - 1, x + size, y + size'
        actual = JackCompiler(prog).compile_expression()
        expected = """<expressionList>
  <expression>
    <term>
      <identifier> x </identifier>
    </term>
  </expression>
  <symbol> , </symbol>
  <expression>
    <term>
      <symbol> ( </symbol>
        <expression>
          <term>
            <identifier> y </identifier>
          </term>
          <symbol> + </symbol>
          <term>
            <identifier> size </identifier>
          </term>
        </expression>
      <symbol> ) </symbol>
    </term>
    <symbol> - </symbol>
    <term>
      <integerConstant> 1 </integerConstant>
    </term>
  </expression>
  <symbol> , </symbol>
  <expression>
    <term>
    <identifier> x </identifier>
    </term>
    <symbol> + </symbol>
    <term>
    <identifier> size </identifier>
    </term>
  </expression>
  <symbol> , </symbol>
  <expression>
    <term>
      <identifier> y </identifier>
    </term>
    <symbol> + </symbol>
    <term>
      <identifier> size </identifier>
    </term>
  </expression>
</expressionList>
"""

        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))


    def test_parens(self):
        prog = '(x + size)'
        actual = JackCompiler(prog).compile_expression()
        expected = """
<expression>
  <term>
    <symbol> ( </symbol>
      <expression>
        <term>
          <identifier> x </identifier>
        </term>
        <symbol> + </symbol>
        <term>
          <identifier> size </identifier>
        </term>
      </expression>
    <symbol> ) </symbol>
  </term>
</expression>
"""
        
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
        
    
    def test_inequality_2(self):
        prog = '(x + size) < 510'
        actual = JackCompiler(prog).compile_expression()
        expected = """
<expression>
  <term>
    <symbol> ( </symbol>
      <expression>
        <term>
          <identifier> x </identifier>
        </term>
        <symbol> + </symbol>
        <term>
          <identifier> size </identifier>
        </term>
      </expression>
    <symbol> ) </symbol>
  </term>
  <symbol> &lt; </symbol>
  <term>
    <integerConstant> 510 </integerConstant>
  </term>
</expression>
"""
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))


    def test_class_subroutine_call(self):
        prog = 'SquareGame.new()'
        actual = JackCompiler(prog).compile_expression()
        expected = """<expression>
  <term>
    <identifier> SquareGame </identifier>
    <symbol> . </symbol>
    <identifier> new </identifier>
    <symbol> ( </symbol>
    <expressionList>
    </expressionList>
    <symbol> ) </symbol>
  </term>
</expression>
"""
        
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
        
    
    def test_simple_subroutine_call(self):
        prog = 'foo()'
        actual = JackCompiler(prog).compile_expression()
        expected = """<expression>
  <term>
    <identifier> foo </identifier>
    <symbol> ( </symbol>
    <expressionList>
    </expressionList>
    <symbol> ) </symbol>
  </term>
</expression>
"""
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
        
    def test_array_access(self):
        prog = 'a[i]'
        actual = JackCompiler(prog).compile_expression()
        expected = """<expression>
  <term>
    <identifier> a </identifier>
    <symbol> [ </symbol>
    <expression>
      <term>
        <identifier> i </identifier>
      </term>
    </expression>
    <symbol> ] </symbol>
  </term>
</expression>
"""
        self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))
        
if __name__ == '__main__':
    unittest.main()
