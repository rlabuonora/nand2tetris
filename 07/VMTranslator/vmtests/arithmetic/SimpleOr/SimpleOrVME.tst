load SimpleOr.vm,
output-file SimpleOr.cmp,
output-list RAM[0]%D2.6.2 RAM[256]%D2.6.2;

set RAM[0] 256,

repeat 3 {
  vmstep;
}

output;

repeat 2 {
  vmstep;
}

output;
