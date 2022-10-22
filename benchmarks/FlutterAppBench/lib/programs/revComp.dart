/* The Computer Language Benchmarks Game
   https://salsa.debian.org/benchmarksgame-team/benchmarksgame/

   contributed by Isaac Gouy based on Jeremy Zerfas's #6 C program
*/

// 21/05/2022
// https://benchmarksgame-team.pages.debian.net/benchmarksgame/program/revcomp-dartexe-5.html

import 'dart:io';
import 'dart:isolate';
import 'dart:typed_data';

final nl = '\n'.codeUnitAt(0);
final def = '>'.codeUnitAt(0); // Definition-line.
final lut = codeComplementLookupTable();

Future<void> runRevComp(Stream<List<int>> text, IOSink writer) async {
  final mainIsolate = ReceivePort();
  var sequenceNumber = 1;
  var sequence = BytesBuilder(copy: false);
  await for (var block in text) {
    var sequenceStart = block.indexOf(def);
    if (sequenceStart >= 0) {
      if (sequence.length > 0) {
        sequence.add(block.sublist(0, sequenceStart));
        Isolate.spawn(
            other,
            Request(
                sequenceNumber++, sequence.takeBytes(), mainIsolate.sendPort));
        sequence.add(block.sublist(sequenceStart, block.length));
        block = <int>[];
      }
    }
    sequence.add(block);
  }
  Isolate.spawn(other,
      Request(sequenceNumber, sequence.takeBytes(), mainIsolate.sendPort));

  final waiting = <SendPort>[];
  var nextSequenceNumberToWrite = 1;
  await mainIsolate.listen((dynamic p) {
    if (p is List){
      if (p.length == 2){
        var message = p[1];
        writer.add(message);
        mainIsolate.close();
      }
      var p1 = p[0];
      if (p1 is SendPort) {
        if (waiting.remove(p1)) {
          nextSequenceNumberToWrite++;
          for (var w in waiting) {
            w.send(nextSequenceNumberToWrite);
          }
        } else {
          waiting.add(p1);
          p1.send(nextSequenceNumberToWrite);
        }
      }
      if (nextSequenceNumberToWrite > sequenceNumber) {
        mainIsolate.close();
      }
    }
  }).asFuture();

}

void other(Request ini) {
  final otherIsolate = ReceivePort();
  var frontPos = ini.bytes.indexOf(nl) + 1;
  var backPos = ini.bytes.length - 1;
  while (frontPos <= backPos && ini.bytes[frontPos] == nl) frontPos++;
  while (frontPos <= backPos && ini.bytes[backPos] == nl) backPos--;

  while (frontPos <= backPos) {
    var tmp = lut[ini.bytes[frontPos]];
    ini.bytes[frontPos] = lut[ini.bytes[backPos]];
    ini.bytes[backPos] = tmp;
    while (ini.bytes[++frontPos] == nl);
    while (ini.bytes[--backPos] == nl);
  }
  ini.p.send([otherIsolate.sendPort]);

  otherIsolate.listen((dynamic nextToWrite) {
    if (nextToWrite == ini.number) {
      ini.p.send([otherIsolate.sendPort, ini.bytes]);
      ini.bytes = Uint8List(0);
    }
  });
}

Uint8List codeComplementLookupTable() {
  final code =       'ABCDGHKMNRSTUVWY'.codeUnits;
  final complement = 'TVGHCDMKNYSAABWR'.codeUnits;
  final lowercaseOffset = 'a'.codeUnitAt(0) - 'A'.codeUnitAt(0);
  final t = Uint8List.fromList(List.generate(128, (int i) => i));
  for (var i = 0; i < code.length; i++) {
    t[code[i]] = complement[i];
    t[code[i] + lowercaseOffset] = complement[i];
  }
  return t;
}

class Request {
  int number;
  Uint8List bytes;
  SendPort p;
  Request(this.number, this.bytes, this.p);
}