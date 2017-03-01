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

class TestStatements(unittest.TestCase):

        def test_statements(self):
            prog = "let x = x;\n do move();"
            expected = """
<statements>
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
  <doStatement>
    <keyword> do </keyword>
   <identifier> move </identifier>
    <symbol> ( </symbol>
    <expressionList>
    </expressionList>
    <symbol> ) </symbol>
    <symbol> ; </symbol>
  </doStatement>
</statements>
"""
            actual = JackCompiler(prog).compile_statements()
            self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

        def test_compile_statements2(self):
            prog = "let x = x;\n do move(); return;"
            expected = """
<statements>
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
  <doStatement>
    <keyword> do </keyword>
    <identifier> move </identifier>
    <symbol> ( </symbol>
    <expressionList>
    </expressionList>
    <symbol> ) </symbol>
    <symbol> ; </symbol>
  </doStatement>
  <returnStatement>
    <keyword> return </keyword>
    <symbol> ; </symbol>
  </returnStatement>
</statements>
"""
            actual = JackCompiler(prog).compile_statements()
            self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))



if __name__ == '__main__':
    unittest.main()

