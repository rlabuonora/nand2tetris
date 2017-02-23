from JackTokenizer import JackTokenizer

class UnexpectedToken(Exception):
    pass

class JackCompiler:

    def __init__(self, program):
        self._tokens = JackTokenizer(program).get_tokens()


    def array_access(self):
        return self._tokens[1].value == '['

    def subroutine_call(self):
        tokenVal = self._tokens[1].value
        return  ( tokenVal == '.' or tokenVal == '(')
    
    def end_of_exp(self):
        if len(self._tokens) == 1:
            return True
        elif (self.array_access() or
              self.subroutine_call()):
            return False
        else:
            return True

    def eat(self, type=None, value=None):
        token = self._tokens.pop(0)
        if type is not None and type != token.type:
            
            raise UnexpectedToken("Unexpected token type: expected {0}, got {1}".format(type, token.type))
        if value is not None and value != token.value:
            raise UnexpectedToken("Unexpected token val: expected {0}, got {1}".format(value, token.value))

        return token.value
    
    def compile_expression(self):
        base = templates["expression"]
        term1 =  self.compile_term()
        return base.format(term1)
        

    def compile_integer_constant(self):
        base = templates["integer_constant"]
        n = self.eat() # pass optional value/type for error correction
        return  base.format(n)

    def compile_string_constant(self):
        base = templates["string_constant"]
        s = self.eat(type="stringConstant")
        return base.format(s)

    def compile_var_name(self):
        base = templates["var_name"]
        var_name = self.eat(type='identifier')
        return base.format(var_name)
    
    def compile_unary_op(self):
        base = templates["unary_op"]
        sym = self.eat(type="symbol")
        term = self.compile_term()
        return base.format(sym, term)

    def compile_fun_call(self):
        base = templates["subroutine_call"]["fun"]
        fun_name = self.eat(type='identifier')
        self.eat(value='(')
        fun_tree = base.format("", fun_name)
        fun_base = templates["subroutine_call"]["base"]
        return fun_base.format(fun_tree, "")

    def compile_array_access(self):
        base = templates["array_access"]
        array_name = self.eat(type='identifier')
        self.eat(value='[')
        array_index = self.compile_expression()
        self.eat(value=']')
        return base.format(array_name, array_index)
    
    # def compile_class_call(self):
    #     class_template = templates["subroutine_call"]["class"]
    #     class_name = self.eat(type='identifier')
    #     cls_tree = base.format(class_name)
    #     self.eat(value='.')
    #     fun_name = self.eat(type='identifier')
    #     self.eat(value='(')
    #     fun_base = templates["subroutine_call"]["base"]
    #     return fun_base.format(class_name)

    
        
        
        
    def compile_term(self):
        next_token = self._tokens[0]
        if next_token.type == 'integerConstant':
            return self.compile_integer_constant()
        elif next_token.type == 'stringConstant':
            return self.compile_string_constant()
        elif next_token == 'keyword':
            return 'compile string constant'
        elif next_token.type == 'symbol':
            if next_token.value == '(':
                return 'compile paren'
            elif next_token.value == '~' or next_token.value == '-':
                return self.compile_unary_op()
        elif next_token.type == 'identifier':
            if self.end_of_exp():
                return self.compile_var_name()
            else:
                token = self._tokens[1]
                if token.value == '.':
                    return self.compile_class_call()
                elif token.value == '(':
                    return self.compile_fun_call()
                elif token.value == '[':
                    return self.compile_array_access()
        return "algo"
    
    def compileClass(self):
        return "output.txt\n"






        
templates = {
    "expression":
"""
<expression>
  {0}
</expression>
""",
    "integer_constant":
"""
<term>
  <integerConstant> {0} </integerConstant>
</term>""",
    "string_constant":    
"""
<term>
  <stringConstant> {0}  </stringConstant>
</term>""",
    "var_name":
"""
<term>
  <identifier> {0} </identifier>
</term>
""",
    "array_access":
"""
<term>
  <identifier> {0} </identifier>
  <symbol> [ </symbol>
  {1}
<symbol> ] </symbol>
</term>
""",    
    "unary_op":
"""
<term>
    <symbol> {0} </symbol>
    {1}
</term>
""",
    "subroutine_call":
  { "fun":
    """    
    <identifier> {0} </identifier>
    <symbol> ( </symbol>
    <expressionList>
    </expressionList>
    <symbol> ) </symbol>
    """,
    "class":
    """
    <identifier> {0} </identifier>
    <symbol> . </symbol>
    """,
    "base":
    """
    <term>
    {0}
    {1}
    </term>
    """
  }
}



