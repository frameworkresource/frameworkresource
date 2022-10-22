import 'dart:math';

enum Program {
  binarytree,
  fannkuch,
  fasta,
  knucleotide,
  mandelbrot,
  nbody,
  pidigits,
  regex,
  revcomp,
  spectral
}

class ProgramExecution {
  late Program program;
  late String parameter;

  ProgramExecution (this.program, this.parameter);
}

ProgramExecution programMapper(String text){
  final splited = text.split("-");
  var map = {
    "binarytree": Program.binarytree,
    "fannkuch": Program.fannkuch,
    "fasta": Program.fasta,
    "knucleotide": Program.knucleotide,
    "mandelbrot": Program.mandelbrot,
    "nbody": Program.nbody,
    "regex": Program.regex,
    "revcomp": Program.revcomp,
    "spectral": Program.spectral,
    "pidigits": Program.pidigits
  };
  if(map.containsKey(splited[0])){
    return ProgramExecution(map[splited[0]]!, splited[1]);
  }
  throw Exception("Invalid program");
}