import JackCompiler
import unittest
import subprocess

class TestCompiler(unittest.TestCase):

    # Helpers
    def compile_file(self, file):
        print subprocess.check_output(['python','main.py', file])

    def compare_files(self, file_1, file_2):
        out = subprocess.check_output(['TextComparer.sh', file_1, file_2])
        return out

    def test_array(self):
        self.compile_file('../../ArrayTest/Main.jack')
        file_1 = '../../ArrayTest/Main.xml'
        file_2 =  '../../ArrayTest/MyMain.xml'
        out = self.compare_files(file_1, file_2)
        self.assertEqual(out, "Comparison ended successfully\n")

    def test_expressionless_square_main(self):
        program = "../../ExpressionlessSquare/Main.jack"
        self.compile_file(program)
        file_1 = '../../ExpressionlessSquare/Main.xml'
        file_2 =  '../../ExpressionlessSquare/MyMain.xml'
        out = self.compare_files(file_1, file_2)
        self.assertEqual(out, "Comparison ended successfully\n")
        
    def test_expressionless_square_square(self):
        program = "../../ExpressionlessSquare/Square.jack"
        self.compile_file(program)
        file_1 = '../../ExpressionlessSquare/Square.xml'
        file_2 =  '../../ExpressionlessSquare/MySquare.xml'
        out = self.compare_files(file_1, file_2)
        self.assertEqual(out, "Comparison ended successfully\n")

    def test_expressionless_square_square_game(self):
        program = "../../ExpressionlessSquare/SquareGame.jack"
        self.compile_file(program)
        file_1 = '../../ExpressionlessSquare/SquareGame.xml'
        file_2 =  '../../ExpressionlessSquare/MySquareGame.xml'
        out = self.compare_files(file_1, file_2)
        self.assertEqual(out, "Comparison ended successfully\n")


if __name__ == '__main__':
    unittest.main()
