import re
from collections import OrderedDict

class JackTokenizer:

    TOKENS = OrderedDict()
    TOKENS["keyword"]  = (r"\bclass\b|\bconstructor\b|\bfunction\b|"
                          "\bmethod\b|\bfield\b|\bstatic\b|\bvar\b|"
                          "\b\int\b|\bchar\b|\bboolean|\bvoid\b|"
                          "\btrue\b|\bfalse\b|\bnull\b|\bthis\b|"
                          "\blet\b|\bdo\b|\bif\b|\belse\b|\bwhile\b|"
                          "\breturn\b")
    TOKENS["symbol"] = r"\{|}|\(|\)|\[|]|\*|\+|\.|\||,|;|-|\/|&|<|>|=|~"
    TOKENS["stringConstant"] =  r'"[^\\n"]+"'
    TOKENS["integerConstant"] = r"\b\d{1,5}\b"
    TOKENS["identifier"] =  r"[a-zA-Z_][a-zA-Z0-9_]*"
        


    def __init__(self, program):
        self._program = program
        no_comments = self.remove_comments(program)
        self._tokens = self.tokenize(no_comments)

    def get_tokens(self):
        return self._tokens

    def foo(self, token, regexp_text):
        regexp = re.compile(regexp_text)
        return not(regexp.match(token) is None)
    
    def token_type(self, token):
        for key, value in JackTokenizer.TOKENS.items():
            if self.foo(token, value):
                return key
    
    
    def tokenize(self, program):
        words = self.split(program)
        print words
        print [self.token_type(word) for word in words]
        return words

    def split(self, program):
        regexp = "|".join( JackTokenizer.TOKENS.values() )

        return re.findall(regexp, program)

    def remove_comments(self, program):
        regexp = r"\/\/.*(\r)?\n|\/\*[\s\S]*?\*\/|\n|\r|\t"
        return re.sub(regexp, "", program)


def read_program(source):
    with open(source, 'r') as myfile:
        data=myfile.read()
    return  data

def obj_filename(source):
    import os
    base = os.path.basename(source)
    file_name =  "My" + os.path.splitext(base)[0] + "T.xml"
    return  os.path.dirname(source) +  "/" + file_name

def write_tokens(tokens, dest):
    with open(dest, 'w') as file:
        file.write(tokens)





if __name__ == "__main__":
    import sys
    source = sys.argv[1]
    program = read_program(source)
    tokens = JackTokenizer(program).getTokens()
    dest = obj_filename(source)
    write_tokens(tokens, dest)
