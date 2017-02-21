import sys
from JackCompiler import JackCompiler


source = sys.argv[1]

    
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
    with open(dest, 'w') as file:
        file.write(tree)

if __name__ == "__main__":
    program = read_program(source)
    tree = JackCompiler(program).compileClass()
    dest = obj_filename(source)
    write_tree(tree, dest)


