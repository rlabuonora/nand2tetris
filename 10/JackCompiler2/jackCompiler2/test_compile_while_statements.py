
from JackCompiler import JackCompiler
import unittest


def read_program(source):
    with open(source, 'r') as myfile:
        data=myfile.read()
    return  data

def remove_whitespace(str):
    return str.replace(" ", "").replace("\n", "")

class TestWhileStatements(unittest.TestCase):

        def test_while_statement(self):
            prog = """
while (key) {
    let key = key;
    do moveSquare();
}
"""
            
            expected = """
<whileStatement>
  <keyword> while </keyword>
  <symbol> ( </symbol>
  <expression>
    <term>
      <identifier> key </identifier>
    </term>
  </expression>
  <symbol> ) </symbol>
  <symbol> { </symbol>
  <statements>
    <letStatement>
      <keyword> let </keyword>
      <identifier> key </identifier>
      <symbol> = </symbol>
      <expression>
        <term>
          <identifier> key </identifier>
        </term>
      </expression>
      <symbol> ; </symbol>
    </letStatement>
    <doStatement>
      <keyword> do </keyword>
      <identifier> moveSquare </identifier>
      <symbol> ( </symbol>
      <expressionList>
      </expressionList>
      <symbol> ) </symbol>
      <symbol> ; </symbol>
    </doStatement>
  </statements>
  <symbol> } </symbol>
</whileStatement>"
"""
            actual = JackCompiler(prog).compile_while_statement()
            self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))

        def test_while_statement2(self):
            prog = """
while (key) {
    let key = key;
}
"""
            expected = """            
<whileStatement>
  <keyword> while </keyword>
  <symbol> ( </symbol>
  <expression>
    <term>
      <identifier> key </identifier>
    </term>
  </expression>
  <symbol> ) </symbol>
  <symbol> { </symbol>
  <statements>
    <letStatement>
      <keyword> let </keyword>
      <identifier> key </identifier>
      <symbol> = </symbol>
      <expression>
        <term>
          <identifier> key </identifier>
        </term>
      </expression>
      <symbol> ; </symbol>
    </letStatement>
  </statements>
  <symbol> } </symbol>
</whileStatement>
"""
            actual = JackCompiler(prog).compile_while_statement()
            self.assertEqual(remove_whitespace(actual), remove_whitespace(expected))         
                
            

if __name__ == '__main__':
    unittest.main()
