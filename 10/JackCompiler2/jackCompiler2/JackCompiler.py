from JackTokenizer import JackTokenizer
import re

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

    def end_of_term(self):
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


n    def end_of_list(self):
        return (len(self._tokens) == 0 or self._tokens[0].value == ')')

    def compile_expression_list(self):
        exps = []
        while (True):
            if self.end_of_list():
                break
            else:
                exp = self.compile_expression()
                exps.append(exp)
            if self.end_of_list():
                break
            else:
                self.eat(value=',')
        base = TEMPLATES["expression_list"]
        expressions = "<symbol> , </symbol>".join(exps)
        return base.format(expressions)

    def compile_expression(self):
        base = TEMPLATES["expression"]
        term1 =  self.compile_term()
        # compile term can return none if there is no term to compile
        if term1 is None:
            return ""
        elif self.has_op():
            sym_char = self.eat('symbol')
            sym_tag = TEMPLATES["symbol"].format(sym_char)
            term2 = self.compile_term()
            return base.format(term1, sym_tag, term2)
        return base.format(term1, "", "") # TODO: refactor to use default

    def has_op(self):
        if len(self._tokens) < 1:
            return False
        next_token = self._tokens[0].value
        regexp = re.compile(r'[/+\-/\/*&///|<>=]')
        return not (re.match(regexp, next_token) is None)

    def compile_integer_constant(self):
        base = TEMPLATES["integer_constant"]
        n = self.eat() # pass optional value/type for error correction
        return  base.format(n)

    def compile_string_constant(self):
        base = TEMPLATES["string_constant"]
        s = self.eat(type="stringConstant")
        return base.format(s)

    def compile_keyword_constant(self):
        base = TEMPLATES["keyword_constant"]
        s = self.eat(type="keyword")
        return base.format(s)

    def compile_var_name(self):
        base = TEMPLATES["var_name"]
        var_name = self.eat(type='identifier')
        return base.format(var_name)

    def compile_unary_op(self):
        base = TEMPLATES["unary_op"]
        sym = self.eat(type="symbol")
        term = self.compile_term()
        return base.format(sym, term)

    def compile_array_access(self):
        base = TEMPLATES["array_access"]
        array_name = self.eat(type='identifier')
        self.eat(value='[')
        array_index = self.compile_expression()
        self.eat(value=']')
        return base.format(array_name, array_index)

    def compile_paren(self):
        base = TEMPLATES["parens"]
        self.eat(value='(')
        expression = self.compile_expression()
        self.eat(value=')')
        return base.format(expression)

    def compile_call_prefix(self):
        if self._tokens[1].value == '.':
            cls_base = TEMPLATES["subroutine_call"]["class"]
            cls_name = self.eat(type='identifier')
            cls_tree = cls_base.format(cls_name)
            self.eat(value='.')
            return cls_tree
        else:
            return ""

    def compile_call_suffix(self):
        base = TEMPLATES["subroutine_call"]["fun"]
        fun_name = self.eat(type='identifier')
        return base.format(fun_name)


    def compile_fun_call(self):
        cls_tree = self.compile_call_prefix()
        fun_tree = self.compile_call_suffix()
        self.eat(value='(')
        exp_list = self.compile_expression_list()
        self.eat(value=')')
        base = TEMPLATES["subroutine_call"]["base"]
        return base.format(cls_tree, fun_tree, exp_list)


    def compile_term(self):
        # can return None 
        next_token = self._tokens[0]
        if next_token.type == 'integerConstant':
            return self.compile_integer_constant()
        elif next_token.type == 'stringConstant':
            return self.compile_string_constant()
        elif next_token.type == 'keyword':
            return self.compile_keyword_constant()
        elif next_token.type == 'symbol':
            if next_token.value == '(':
                return self.compile_paren()
            elif next_token.value == '~' or next_token.value == '-':
                return self.compile_unary_op()
        elif next_token.type == 'identifier':
            if self.end_of_term():
                return self.compile_var_name()
            else:
                token = self._tokens[1]
                if token.value == '.' or token.value == '(':
                    return "<term>\n" + self.compile_fun_call() + "</term>\n"
                elif token.value == '[':
                    return self.compile_array_access()


    def compile_statement(self):
        next_token = self._tokens[0]
        if next_token.value == 'do':
            return self.compile_do()
        elif next_token.value == 'let':
            return self.compile_let()
        elif next_token.value == 'if':
            return self.compile_if()
        elif next_token.value == "while":
            return self.compile_while()
        elif next_token.value == "return":
            return self.compile_return()
        else:
            return False

    def compile_statements(self):
        statements = []
        while (len(self._tokens) > 0):
            statement = self.compile_statement()
            if not statement:
                break
            else:
                statements.append(statement)
                
        statements = "\n".join(statements)
        base = STATEMENTS["statements"]
        return base.format(statements)
    
    def compile_if(self):
        self.eat(value='if')
        self.eat(value='(')
        condition = self.compile_expression()
        self.eat(value=')')
        self.eat(value='{')
        statements = self.compile_statements()
        self.eat(value='}')
        base = STATEMENTS["if"]
        return base.format(condition, statements)
        
        
    def compile_do(self):
        self.eat(value='do')
        call = self.compile_fun_call()
        self.eat(value=';')
        base = STATEMENTS["do"]
        return base.format(call)

    def compile_let(self):
        self.eat(value='let')
        var_name = self.eat(type='identifier')
        self.eat(value='=')
        expr = self.compile_expression()
        self.eat(value=';')
        base = STATEMENTS["let"]
        return base.format(var_name, expr)

    def compile_while(self):
        self.eat(value='while')
        self.eat(value='(')
        condition = self.compile_expression()
        self.eat(value=')')
        self.eat(value='{')
        statements = self.compile_statements()
        self.eat(value='}')
        base = STATEMENTS["while"]
        return base.format(condition, statements)

    def compile_return(self):
        self.eat(value="return")
        # optional, if no expression this call does nothing (same as local var decs)
        expression = self.compile_expression() 
        base = STATEMENTS["return"]
        self.eat(value=';')
        return base.format(expression)

    def compile_class(self):
        self.eat(value="class")
        class_name = self.compile_identifier()
        self.eat(value='{')
        class_var_decs = self.compile_class_var_decs()
        subroutines = self.compile_subroutine_declarations()
        base = STRUCTURE["class"]
        return base.format(class_name, class_var_decs, subroutines)
        
    
    def compile_class_var_decs(self):
        # same pattern as in local_va_decs
        class_var_decs = []
        while (len(self._tokens) > 0):
            class_var_dec = self.compile_class_var_dec()
            if not class_var_dec:
                break
            else:
                class_var_decs.append(class_var_dec)
        declarations = "\n".join(class_var_decs)
        return declarations

    def compile_class_var_dec(self):
        next_token = self._tokens[0]
        if (next_token.value != "field" and next_token.value != "static" ):
            return False
        field = self.eat(type="keyword")
        typ = self.compile_type()
        ident = self.compile_identifier()
        idents = [ident]
        
        while (self._tokens[0].value == ','):
            self.eat(value=',')
            ident = self.compile_identifier()
            idents.append(ident)
        self.eat(value=';')
        variables = "<symbol> , </symbol>".join(idents)
        return STRUCTURE["class_variable_declaration"].format(field, typ, variables)
    
    def compile_local_var_decs(self):
        # follow same pattern as compile_statements
        local_var_decs = []
        while (len(self._tokens) > 0):
            local_var_dec = self.compile_local_var_dec()
            if not local_var_dec:
               break
            else:
                local_var_decs.append(local_var_dec)
        declarations = "\n".join(local_var_decs)
        return declarations
            
    def compile_local_var_dec(self):        
        if (self._tokens[0].value != "var"):
            return False
        self.eat(value="var")
        typ = self.compile_type()
        ident = self.compile_identifier()
        idents =  [ident]
        while (self._tokens[0].value == ','):
            self.eat(value=',')
            ident = self.compile_identifier()
            idents.append(ident)
        self.eat(value=';')
        variables = "<symbol> , </symbol>".join(idents)
        return STRUCTURE["variable_declaration"].format(typ, variables)


    def compile_identifier(self):
        return STRUCTURE["tag"].format('identifier', self.eat(type='identifier'))
    
    def compile_type(self):
        base = STRUCTURE["tag"]
        next_token_type = self._tokens[0].type
        next_token_val = self.eat()
        return base.format(next_token_type, next_token_val)


    # same pattern as in compile expression list REFACTOR
    def compile_param(self):
        typ = self.compile_type()
        param_name = self.compile_identifier()
        return typ + "\n" + param_name

    def compile_param_list(self):
        params = []
        while (True):
            if self.end_of_list():
                break
            else:
                param = self.compile_param()
                params.append(param)
                if self.end_of_list():
                    break
                else:
                    self.eat(value=',')
        base = STRUCTURE["param_list"]
        parameters = "<symbol> , </symbol>".join(params)
        return base.format(parameters)                    
        
        
    def compile_subroutine_body(self):
        self.eat(value='{')
        variable_declarations = self.compile_local_var_decs() # only one!
        statements = self.compile_statements()
        self.eat(value='}')
        base = STRUCTURE["subroutine_body"]
        return base.format(variable_declarations, statements)


    def compile_subroutine_declarations(self):
        # same pattern as compile class_var_decs
        subroutines = []
        while (len(self._tokens) > 0):
            subroutine = self.compile_subroutine_declaration()
            if not subroutine:
                break
            else:
                subroutines.append(subroutine)
        declarations = "\n".join(subroutines)
        return declarations

    def compile_subroutine_declaration(self):
        if (self._tokens[0].type != "keyword"):
            return False
        subroutine_type = self.compile_type()
        return_type = self.compile_type()
        fun_name = self.compile_identifier()
        
        self.eat(value='(')
        parameter_list = self.compile_param_list()
        self.eat(value=')')
        signature = STRUCTURE["signature"].format(subroutine_type, return_type, fun_name, parameter_list)
        body = self.compile_subroutine_body()
        return STRUCTURE["subroutine"].format(signature, body)
        
STATEMENTS = {
    "if":
"""
<ifStatement>
  <keyword> if </keyword>
  <symbol> ( </symbol>
  {0}
  <symbol> ) </symbol>
  <symbol> {{ </symbol>
  {1}
  <symbol> }} </symbol>
</ifStatement>
""",
    "statements":
"""    
<statements>
{0}
</statements>
""",
    "return":
"""
<returnStatement>
  <keyword> return </keyword>
  {0}
  <symbol> ; </symbol>
</returnStatement>
""",
    
    "while":
"""
<whileStatement>
  <keyword> while </keyword>
  <symbol> ( </symbol>
  {0}
  <symbol> ) </symbol>
  <symbol> {{ </symbol>
  {1}
  <symbol> }} </symbol>
  </whileStatement>
""",
    "do":
"""
<doStatement>
  <keyword> do </keyword>
  {0}
  <symbol> ; </symbol>
</doStatement>
""",
    "let":
"""
<letStatement>
  <keyword> let </keyword>
  <identifier> {0} </identifier>
  <symbol> = </symbol>
  {1}
  <symbol> ; </symbol>
</letStatement>
"""
    }



STRUCTURE = {
    "class":
"""
<class>
  <keyword> class </keyword>
  {0}
  <symbol> {{ </symbol>
  {1}
  {2}
  <symbol> }} </symbol>
</class>  
""",
    "signature":
"""
{0}
{1}
{2}
<symbol> ( </symbol>
{3}
<symbol> ) </symbol>
""",
    "subroutine":
"""
<subroutineDec>
{0}
{1}
</subroutineDec>
""" ,   
    "param_list":
"""
<parameterList>
{0}
</parameterList>
""",
    "variable_declaration":
"""
<varDec>
<keyword> var </keyword>
  {0}
  {1}
<symbol> ; </symbol>
</varDec>
""",
    "class_variable_declaration":
"""
<classVarDec>
<keyword> {0} </keyword>
{1}
{2}
<symbol> ; </symbol>
</classVarDec>
""",  
    "tag":
"""
<{0}> {1} </{0}>
""",
    "subroutine_body":
"""
<subroutineBody>
<symbol> {{ </symbol>
{0}
{1}
<symbol> }} </symbol>
</subroutineBody>
"""    
    }

TEMPLATES = {
    "symbol":
    "<symbol> {0} </symbol>",
    "expression_list":
"""
<expressionList>
  {0}
</expressionList>
""",
    "expression":
"""
<expression>
  {0}
  {1}
  {2}
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
    "keyword_constant":
"""
<term>
  <keyword> {0}  </keyword>
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
    "parens":
"""
  <term>
    <symbol> ( </symbol>
    {0}
    <symbol> ) </symbol>
  </term>
""",
    "subroutine_call":
  { "class":
    """
    <identifier> {0} </identifier>
    <symbol> . </symbol>
    """,
    "fun":
    """
    <identifier> {0} </identifier>
    """,
    "base":
    """
    {0}
    {1}
    <symbol> ( </symbol>
    {2}
    <symbol> ) </symbol>
    """
  }
}
