import sys
from JackCompiler import JackCompiler

    
def read_program(source):
    with open(source, 'r') as myfile:
        data=myfile.read()
    return  data

def obj_filename(source):
    import os
    base = os.path.basename(source)
    file_name =  "My" + os.path.splitext(base)[0] + ".xml"
    return  os.path.dirname(source) +  "/" + file_name
    
def write_tree(tree, dest):
    import os
    text = os.linesep.join([s for s in tree.splitlines() if s.strip()])
    with open(dest, 'w') as file:
        file.write(text)

if __name__ == "__main__":
    source = sys.argv[1]
    program = read_program(source)
    tree = JackCompiler(program).compile_class()
    # tokens = JackTokenizer(program).tokenize()
    dest = obj_filename(source)
    write_tree(tree, dest)


