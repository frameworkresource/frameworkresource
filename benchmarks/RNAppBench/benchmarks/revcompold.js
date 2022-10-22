storeFunction(loadFile, 'revcompold');

function loadFile(fileName) {
  window.resolveLocalFileSystemURL(
    'file:///android_asset/' + 'www/files/' + fileName + '.txt',
    startRevCompOld,
    fail,
  );
}

function startRevCompOld(fileEntry) {
  revcompold(fileEntry);
}

function revcompold(fileEntry) {
  var doTheLoop = 1;

  var comp = [];
  comp[65] = 'T';
  comp[66] = 'V';
  comp[67] = 'G';
  comp[68] = 'H';
  comp[71] = 'C';
  comp[72] = 'D';
  comp[75] = 'M';
  comp[77] = 'K';
  comp[78] = 'N';
  comp[82] = 'Y';
  comp[83] = 'S';
  comp[84] = 'A';
  comp[85] = 'A';
  comp[86] = 'B';
  comp[87] = 'W';
  comp[89] = 'R';
  comp[97] = 'T';
  comp[98] = 'V';
  comp[99] = 'G';
  comp[100] = 'H';
  comp[103] = 'C';
  comp[104] = 'D';
  comp[107] = 'M';
  comp[109] = 'K';
  comp[110] = 'N';
  comp[114] = 'Y';
  comp[115] = 'S';
  comp[116] = 'A';
  comp[117] = 'A';
  comp[118] = 'B';
  comp[119] = 'W';
  comp[121] = 'R';

  var LA_LEN = 995;

  function LinkedArray(prev) {
    this.prev = prev;
    this.next = undefined;
    this.pos = 0;
    this.data = [];
  }

  function reverse(la) {
    var comps = comp,
      i,
      lines = la.data,
      lnIdx = la.pos - 1,
      line = lines[lnIdx],
      c = 1,
      buff = [''],
      buffIdx = 1,
      rev = new Array(61);

    rev[0] = '';

    for (; true; ) {
      for (i = line.length; i-- > 0; ++c) {
        rev[c] = comps[line.charCodeAt(i)];
        if (c === 60) {
          buff[buffIdx] = rev.join('');
          buffIdx++;
          c = 0;
        }
      }

      lnIdx--;
      line = lines[lnIdx];

      if (line !== undefined) {
        continue;
      }

      la = la.prev;
      if (la === undefined) {
        if (c > 1) {
          buff[buffIdx] = rev.join('').substr(0, c - 1);
          buffIdx++;
        }
        buff[buffIdx] = '';
        buffIdx++;
        if (buffIdx < buff.length) {
          //    console.log(buff.slice(0,buffIdx).join('\n'));
        } else {
          //   console.log(buff.join('\n'));
        }
        return;
      }

      lines = la.data;
      lnIdx = la.pos;
      lnIdx--;
      line = lines[lnIdx];
      //  console.log(buff.join('\n'));
      buffIdx = 1;
    }
  }

  function runRevComp(fileEntry) {
    fileEntry.file(function (file) {
      var reader = new FileReader();

      reader.onload = function (progressEvent) {
        for (var loopinx = 0; loopinx < doTheLoop; loopinx++) {
          var line,
            headLA = new LinkedArray(),
            la = headLA,
            lnIdx = 0,
            lines = la.data;

          var linesCTR = this.result.split('\n');
          var lineIndex = 0;

          line = linesCTR[lineIndex];

          //console.log(line);
          lineIndex++;

          for (; lineIndex < linesCTR.length; lineIndex++) {
            line = linesCTR[lineIndex];
            if (line[0] !== '>') {
              if (lnIdx === LA_LEN) {
                la.pos = LA_LEN;

                if (la.next === undefined) {
                  la = la.next = new LinkedArray(la);
                } else {
                  la = la.next;
                }
                lines = la.data;
                lines[0] = line;
                lnIdx = la.pos = 1;
              } else {
                lines[lnIdx] = line;
                lnIdx++;
              }
            } else {
              lc = 0;
              la.pos = lnIdx;
              reverse(la, comp);
              //  console.log(line);
              la = headLA;
              lines = la.data;
              la.pos = 0;
              lnIdx = 0;
            }
          }
          la.pos = lnIdx;
          reverse(la, comp);
        }
        return 'finished';
      };
      reader.readAsText(file);
    });
  }

  runRevComp(fileEntry);
}

export default revcompold;
