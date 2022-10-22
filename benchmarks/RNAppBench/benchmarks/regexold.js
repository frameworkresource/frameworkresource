storeFunction(loadFile, 'regexOld');

function loadFile(fileName) {
  window.resolveLocalFileSystemURL(
    'file:///android_asset/' + 'www/files/' + fileName + '.txt',
    startRegexOld,
    fail,
  );
}

function startRegexOld(fileEntry) {
  runRegen(fileEntry);
}

function runRegen(fileEntry) {
  var i = '',
    ilen,
    clen,
    j,
    q = [
      /agggtaaa|tttaccct/gi,
      /[cgt]gggtaaa|tttaccc[acg]/gi,
      /a[act]ggtaaa|tttacc[agt]t/gi,
      /ag[act]gtaaa|tttac[agt]ct/gi,
      /agg[act]taaa|ttta[agt]cct/gi,
      /aggg[acg]aaa|ttt[cgt]ccct/gi,
      /agggt[cgt]aa|tt[acg]accct/gi,
      /agggta[cgt]a|t[acg]taccct/gi,
      /agggtaa[cgt]|[acg]ttaccct/gi,
    ],
    b = [
      /B/g,
      '(c|g|t)',
      /D/g,
      '(a|g|t)',
      /H/g,
      '(a|c|t)',
      /K/g,
      '(g|t)',
      /M/g,
      '(a|c)',
      /N/g,
      '(a|c|g|t)',
      /R/g,
      '(a|g)',
      /S/g,
      '(c|g)',
      /V/g,
      '(a|c|g)',
      /W/g,
      '(a|t)',
      /Y/g,
      '(c|t)',
    ];

  fileEntry.file(function (file) {
    var reader = new FileReader();

    reader.onloadend = function (progressEvent) {
      var lines = this.result.split('\n');
      var lineIndex = 0;

      for (; lineIndex < lines.length; lineIndex++) {
        i += lines[lineIndex] + '\n';
        ilen = i.length;
      }

      i = i.replace(/^>.*\n|\n/gm, '');
      clen = i.length;

      for (j = 0; j < q.length; ++j) var args3 = q[j].source;
      var args = (i.match(q[j]) || []).length;

      for (j = -1; j < b.length - 1; ) i = i.replace(b[++j], b[++j]);
      var args2 = ['', ilen, clen, i.length].join('\n');

      return 'finished';
    };
    reader.readAsText(file);
  });
}

export default regexold;
