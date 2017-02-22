import re
from collections import OrderedDict

class JackTokenizer:

    TOKENS = OrderedDict()
    TOKENS["keyword"]  = (r"\bclass\b|\bconstructor\b|\bfunction\b|"
                          r"\bmethod\b|\bfield\b|\bstatic\b|\bvar\b|"
                          r"\b\int\b|\bchar\b|\bboolean|\bvoid\b|"
                          r"\btrue\b|\bfalse\b|\bnull\b|\bthis\b|"
                          r"\blet\b|\bdo\b|\bif\b|\belse\b|\bwhile\b|"
                          r"\breturn\b")
    TOKENS["symbol"] = r"\{|}|\(|\)|\[|]|\*|\+|\.|\||,|;|-|\/|&|<|>|=|~"
    TOKENS["stringConstant"] =  r'"[^\\n"]+"'
    TOKENS["integerConstant"] = r"\b\d{1,5}\b"
    TOKENS["identifier"] =  r"[a-zA-Z_][a-zA-Z0-9_]*"
        


    def __init__(self, program):
        self._program = program
        no_comments = self.remove_comments(program)
        self._tokens = "<tokens>\n" + self.tokenize(no_comments) + "\n</tokens>"

    def get_tokens(self):
        return self._tokens

    def match_token(self, token, regexp):
        regexp = re.compile(regexp)
        return not(regexp.match(token) is None)
    
    def token_type(self, token):
        for key, reg_exp in JackTokenizer.TOKENS.items():
            if self.match_token(token, reg_exp):
                return key
    
    def tokenize(self, program):
        words = self.split(program)
        return "\n".join([self.make_tag(self.token_type(word), word) for word in words])
        

    def split(self, program):
        regexp = "|".join( JackTokenizer.TOKENS.values() )

        return re.findall(regexp, program)

    def remove_comments(self, program):
        regexp = r"\/\/.*(\r)?\n|\/\*[\s\S]*?\*\/|\n|\r|\t"
        return re.sub(regexp, " ", program)

    def make_tag(self, name, value):
        if name == "stringConstant":
            value = value[1:-1]
        elif name == "symbol":
            value = html_entities(value)
        return "<{0}> {1} </{0}>".format(name, value)

# helpers
def html_entities(value):
    if value == '<':
        return '&lt;'
    elif value == '>':
        return '&gt;'
    elif value == '&':
        return '&amp;'
    elif value == '"':
        return '&quot;'
    else:
        return value

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
    tokens = JackTokenizer(program).get_tokens()
    dest = obj_filename(source)
    write_tokens(tokens, dest)
