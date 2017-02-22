from JackTokenizer import JackTokenizer


class JackCompiler:

    def __init__(self, program):
        tokens = JackTokenizer(program).get_tokens()
        print tokens
        
    def compileExpression(self):
        return "algo"
    
    def compileClass(self):
        return "output.txt\n"






        





