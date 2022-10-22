import fs from "react-native-fs";
import { write } from "./writeFile";

const output = [];

async function startKnucleotide(fileName) {
  const ret = await fs.readFileAssets('files/'+fileName+'.txt', "utf8");
  knucleotide(ret);
  await write(output.join("\n"));
  return 'finished';
}

function knucleotide(data) {
  var dataLength = 0;

  class SeqSets {
    constructor(len) {
      this.seqLen = len;
      this.uintLeft = 0;
      this.uintRight = 0;
      this.maskLeft = len <= 12 ? 0 : Math.pow(2, (len - 12) * 2) - 1;
      this.maskRight = Math.pow(2, Math.min(12, len) * 2) - 1;
      this.data = {};
      this.lastUintLeft = undefined;
      this.lastLeftData = undefined;
    }
    pushToken(char) {
      this.uintLeft =
        ((this.uintLeft << 2) | (this.uintRight >>> 22)) & this.maskLeft;
      this.uintRight = ((this.uintRight << 2) | char) & this.maskRight;
    }
    inc(char) {
      if (this.uintLeft !== this.lastUintLeft) {
        this.lastUintLeft = this.uintLeft;
        this.lastLeftData = this.data[this.uintLeft] =
          this.data[this.uintLeft] || {};
      }
      this.lastLeftData[this.uintRight] =
        (this.lastLeftData[this.uintRight] || 0) + 1;
    }
    incWithToken(char) {
      this.pushToken(char);
      this.inc();
    }
    getCount(seq) {
      var seqLeft = seq.length <= 12 ? '' : seq.substr(0, seq.length - 12), seqRight = seq.substr(-12), uintLeft = (seqLeft && toUint(seqLeft)) || 0, uintRight = toUint(seqRight);

      return this.data[uintLeft][uintRight];
    }
  }


  var seq1 = new SeqSets(1),
    seq2 = new SeqSets(2),
    seq3 = new SeqSets(3),
    seq4 = new SeqSets(4),
    seq6 = new SeqSets(6),
    seq12 = new SeqSets(12),
    seq18 = new SeqSets(18);

  var tables = [seq1, seq2, seq3, seq4, seq6, seq12, seq18];

  readInput(data);


  function charToInt(str) {
    switch (str) {
      case 'a':
        return 0;
      case 'c':
        return 1;
      case 'g':
        return 2;
      case 't':
        return 3;
    }
  }

  function toStr(num, len) {
    var res = '';
    while (len > 0) {
      switch (num & 3) {
        case 0:
          res = 'A' + res;
          break;
        case 1:
          res = 'C' + res;
          break;
        case 2:
          res = 'G' + res;
          break;
        case 3:
          res = 'T' + res;
          break;
      }
      num = num >>> 2;
      len--;
    }
    return res;
  }

  function toUint(str) {
    var offset = 2 * str.length,
      uint = new Uint32Array(new ArrayBuffer(4)),
      i = 0;

    while (offset) {
      offset -= 2;
      uint[0] |= charToInt(str[i]) << offset;
      i++;
    }
    return uint[0];
  }

  function readInput(readInputData) {
    var len = 0,
      line,
      i,
      char,
      si,
      slen = tables.length;

    var seqSet;

    var lines = readInputData.split('\n');

    var lineIndex = 0;

    while (lines[lineIndex].substr(0, 3) !== '>TH') {
      lineIndex++;
    }

    lineIndex++;
    line = lines[lineIndex];
    i = 0;
    len = line.length;

    // the first-line is a special case as not all the counts should start
    // saving immediately
    while (i < 18) {
      char = charToInt(line[i]);

      si = 0;
      iPlusOne = i + 1;
      for (; si < slen; si++) {
        seqSet = tables[si];

        seqSet.pushToken(char);
        if (seqSet.seqLen <= i + 1) {
          seqSet.inc();
        }
      }
      i++;
    }

    // use do-loop bc want to preserve `i` position on first line
    do {
      len = line.length;
      dataLength += len;
      while (i < len) {
        char = charToInt(line[i]);

        seq1.incWithToken(char);
        seq2.incWithToken(char);
        seq3.incWithToken(char);
        seq4.incWithToken(char);
        seq6.incWithToken(char);
        seq12.incWithToken(char);
        seq18.incWithToken(char);

        i++;
      }
      i = 0;

      lineIndex++;
      line = lines[lineIndex];
    } while (lineIndex < lines.length && line[0] !== '>');

    endExecution();
  }

  function endExecution() {
    sortCounts(seq1.data[0], 1);
    sortCounts(seq2.data[0], 2);

    output.push(seq3.getCount('ggt') +'\t' + 'GGT');
    output.push(seq4.getCount('ggta') +'\t' + 'GGTA');
    output.push(seq6.getCount('ggtatt') +'\t' + 'GGTATT');
    output.push(seq12.getCount('ggtattttaatt') +'\t' + 'GGTATTTTAATT');
    output.push(seq18.getCount('ggtattttaatttatagt') + '\t' + 'GGTATTTTAATTTATAGT');
  }

  function sortCounts(data, seqLen) {
    var keys = Object.keys(data),
      pctFactor = 100 / (dataLength - seqLen + 1);

    keys.sort(function (a, b) {
      return data[b] - data[a];
    });

    keys.forEach(function (code) {
      output.push(toStr(code, seqLen) + " " + (data[code] * pctFactor).toFixed(3));
    });
  }
}

export default startKnucleotide;