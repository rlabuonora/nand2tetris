import JackCompiler
import JackTokenizer
import unittest

def read_program(source):
    with open(source, 'r') as myfile:
        data=myfile.read()
    return  data


def get_token_list(prog):
    return JackTokenizer.JackTokenizer(prog).get_tokens().split("\n")[1:-1]
    
class TestCompileExpression(unittest.TestCase):

    # Helpers
    def test_array(self):
        file ='../../ArrayTest/Main.jack'
        prog = read_program(file)
        tokens = get_token_list(prog)
        

    def test_var_name(self):
        prog = 'x'
        tokens = get_token_list(prog)
        

    def test_unary_op2(self):
        prog = '~x'
        tokens = get_token_list(prog)
        actual = JackCompiler.JackCompiler(prog).compileExpression()
        expected = """<expression>
  <term>
    <symbol> ~ </symbol>
    <term>
      <identifier> x </identifier>
    </term>
  </term>
</expression>
"""
        self.assertEqual(actual, expected)

    def test_binary_op(self):
        prog = 'x + 1'
        tokens = get_token_list(prog)
        actual = JackCompiler.JackCompiler(prog).compileExpression()
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
        self.assertEqual(actual, expected)

    def test_integer_constant(self):
        prog = '1'
        tokens = get_token_list(prog)
        actual = JackCompiler.JackCompiler(prog).compileExpression()
        expected = """<expression>
  <term>
    <integerConstant> 1 </integerConstant>
  </term>
</expression>
"""
        self.assertEqual(actual, expected)

    def test_string_constant(self):
        prog = '"algo"'
        tokens = get_token_list(prog)
        actual = JackCompiler.JackCompiler(prog).compileExpression()
        expected = """<expression>
  <term>
    <stringConstant> algo  </stringConstant>
  </term>
</expression>
"""
        self.assertEqual(actual, expected)

    def test_expression_list(self):
        prog = 'x, (y + size) - 1, x + size, y + size'
        tokens = get_token_list(prog)
        actual = JackCompiler.JackCompiler(prog).compileExpression()
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
        self.assertEqual(actual, expected)                                

                
    def test_string_constant(self):
        prog = '(x + size) < 510'
        tokens = get_token_list(prog)
        actual = JackCompiler.JackCompiler(prog).compileExpression()
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
        self.assertEqual(actual, expected)                                


    def test_subroutine_call(self):
        prog = 'SquareGame.new()'
        tokens = get_token_list(prog)
        actual = JackCompiler.JackCompiler(prog).compileExpression()
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
        self.assertEqual(actual, expected)

    def test_subroutine_call_2(self):
        prog = 'foo()'
        tokens = get_token_list(prog)
        actual = JackCompiler.JackCompiler(prog).compileExpression()
        expected = """<expression>
  <term>
    <identifier> new </identifier>
    <symbol> ( </symbol>
    <expressionList>
    </expressionList>
    <symbol> ) </symbol>
  </term>
</expression>
"""
        self.assertEqual(actual, expected)        
        
    def test_array_access(self):
        prog = 'a[i]'
        tokens = get_token_list(prog)
        actual = JackCompiler.JackCompiler(prog).compileExpression()
        expected = """<expression>
  <term>
    <identifier> a </identifier>
    <symbol> [ </symbol>
    <expression>
      <term>
        <identifier> i </identifier>
      </term>
    </expression>" +
    <symbol> ] </symbol>
  </term>
</expression>
"""
        self.assertEqual(actual, expected)                                
        
        



        

if __name__ == '__main__':
    unittest.main()
