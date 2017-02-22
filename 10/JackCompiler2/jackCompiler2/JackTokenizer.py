import re
from collections import OrderedDict

class JackTokenizer:

    def __init__(self, program):
        self._program = self.remove_comments(program) 
        self._tokens = self.tokenize()

    def to_xml(self):
        tags = "\n".join([token.make_tag() for token in self._tokens])
        xml= "<tokens>\n" + tags +  "\n</tokens>"
        return xml
        
    def get_tokens(self):
        return self._tokens
    
    def tokenize(self):
        words = self.split(self._program)
        return [JackToken(word) for word in words]
        

    def split(self, program):
        regexp = "|".join( JackToken.TOKENS.values() )

        return re.findall(regexp, program)

    def remove_comments(self, program):
        regexp = r"\/\/.*(\r)?\n|\/\*[\s\S]*?\*\/|\n|\r|\t"
        return re.sub(regexp, " ", program)



class JackToken:

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

    def __init__(self, token):
        self.type = self.token_type(token)
        self.value = self.sanitize(self.type, token)


    def __repr__(self):
        return "type: {0}, value: '{1}'\n".format(self.type, self.value)
    def match_token(self, token, regexp):
        regexp = re.compile(regexp)
        return not(regexp.match(token) is None)
    
    def token_type(self, token):
        for key, reg_exp in JackToken.TOKENS.items():
            if self.match_token(token, reg_exp):
                return key        
        
    def sanitize(self, type, value):
        if type == "stringConstant":
            return value[1:-1]
        elif type == "symbol":
            return self.html_entities(value)
        else:
            return value
        
    def make_tag(self):
        return "<{0}> {1} </{0}>".format(self.type, self.value)

    def html_entities(self, value):
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
    xml = JackTokenizer(program).to_xml()
    dest = obj_filename(source)
    write_tokens(xml, dest)
