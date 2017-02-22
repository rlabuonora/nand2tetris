import JackTokenizer


class JackCompiler:

    def __init__(self, program):
        tokenizer = JackTokenizer.JackTokenizer(program)
        self._tokens = tokenizer.get_tokens().split("\n")[1:-1]
        print self._tokens

    def compileExpression(self):
        print self._tokens
        return "algo"
    
    def compileClass(self):
        return "output.txt\n"





class JackToken:

    def __init__(self, tag):
        
        





