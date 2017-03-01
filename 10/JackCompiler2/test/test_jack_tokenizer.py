import unittest
import JackTokenizer
import subprocess

class TestTokenizer(unittest.TestCase):

    def tokenize_file(self, file):
        print subprocess.check_output(['python','JackTokenizer.py', file])        

    def compare_files(self, file_1, file_2):
        # TODO: share with TestCompiler class
        out = subprocess.check_output(['TextComparer.sh', file_1, file_2])
        return out

    def test_array(self):
        self.tokenize_file('../../ArrayTest/Main.jack')
        file_1 = '../../ArrayTest/MainT.xml'
        file_2 =  '../../ArrayTest/MyMainT.xml'
        out = self.compare_files(file_1, file_2)
        self.assertEqual(out, "Comparison ended successfully\n")

    def test_expressionless_square_main(self):
        program = "../../ExpressionlessSquare/Main.jack"
        self.tokenize_file(program)
        file_1 = '../../ExpressionlessSquare/MainT.xml'
        file_2 =  '../../ExpressionlessSquare/MyMainT.xml'
        out = self.compare_files(file_1, file_2)
        self.assertEqual(out, "Comparison ended successfully\n")
        
    def test_expressionless_square_square(self):
        program = "../../ExpressionlessSquare/Square.jack"
        self.tokenize_file(program)
        file_1 = '../../ExpressionlessSquare/SquareT.xml'
        file_2 =  '../../ExpressionlessSquare/MySquareT.xml'
        out = self.compare_files(file_1, file_2)
        self.assertEqual(out, "Comparison ended successfully\n")

    def test_expressionless_square_square_game(self):
        program = "../../ExpressionlessSquare/SquareGame.jack"
        self.tokenize_file(program)
        file_1 = '../../ExpressionlessSquare/SquareGameT.xml'
        file_2 =  '../../ExpressionlessSquare/MySquareGameT.xml'
        out = self.compare_files(file_1, file_2)
        self.assertEqual(out, "Comparison ended successfully\n")


        
if __name__ == '__main__':
    unittest.main()
