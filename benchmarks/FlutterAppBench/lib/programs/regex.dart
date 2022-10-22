/* The Computer Language Benchmarks Game
   https://salsa.debian.org/benchmarksgame-team/benchmarksgame/

   contributed by Isaac Gouy, RegExp from Jos Hirth's program
*/

// 21/05/2022
// https://benchmarksgame-team.pages.debian.net/benchmarksgame/program/regexredux-dartexe-4.html

import 'dart:io';

void runRegex(String s, IOSink writer) {
    final z = s.replaceAll(RegExp('>.*\n|\n', multiLine: true), '');
    printPatternMatches(z, writer);
    writer.write('\n${s.length}\n${z.length}\n${magicLengthOf(z)}');
}

void printPatternMatches(String s, IOSink writer) {
  const simple = [
    'agggtaaa|tttaccct',
    '[cgt]gggtaaa|tttaccc[acg]',
    'a[act]ggtaaa|tttacc[agt]t',
    'ag[act]gtaaa|tttac[agt]ct',
    'agg[act]taaa|ttta[agt]cct',
    'aggg[acg]aaa|ttt[cgt]ccct',
    'agggt[cgt]aa|tt[acg]accct',
    'agggta[cgt]a|t[acg]taccct',
    'agggtaa[cgt]|[acg]ttaccct'
  ];

  for (var each in simple) {
    final regex = RegExp(each, multiLine: true);
    writer.writeln('$each ${regex.allMatches(s).length}');
  }
}

int magicLengthOf(String s) {
  const magic = [
    ['tHa[Nt]', '<4>'],
    ['aND|caN|Ha[DS]|WaS', '<3>'],
    ['a[NSt]|BY', '<2>'],
    ['<[^>]*>', '|'],
    ['\\|[^|][^|]*\\|', '-'],
  ];

  for (var each in magic) {
    final regex = RegExp(each.first, multiLine: true);
    s = s.replaceAll(regex, each.last);
  }
  return s.length;
}