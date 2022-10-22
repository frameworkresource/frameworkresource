import fs from "react-native-fs";

function loadFile(fileName) {

  /*window.resolveLocalFileSystemURL(
    'file:///android_asset/' + 'www/files/' + fileName + '.txt',
    startRegex,
    fail,
  ); */
}

async function startRegex(fileEntry) {

  const ret = await fs.readFileAssets("files/Input1000000.txt", "utf8");
  regex(ret);

  return 'finished';

  //.then(binary => {
  //  return regex(binary);
  //})
  //.catch(console.error)

  /*fileEntry.file(file => {
    var reader = new FileReader();
    reader.onloadend = e => {
      regex(e.target.result);
    };
    reader.readAsText(file);
  });
}*/

function regex(data) {
  //getData();

  //async function getData(){
  //    mainThread(await fetch("file:///android_asset/" + "www/files/" + fileName +".txt").then(response => response.text()));
  //}

  console.log("entrou regex");
  mainThread(data);
    
    function mainThread(data) {
      console.log("entrou mainThread");
      const regExps = [
        /agggtaaa|tttaccct/gi,
        /[cgt]gggtaaa|tttaccc[acg]/gi,
        /a[act]ggtaaa|tttacc[agt]t/gi,
        /ag[act]gtaaa|tttac[agt]ct/gi,
        /agg[act]taaa|ttta[agt]cct/gi,
        /aggg[acg]aaa|ttt[cgt]ccct/gi,
        /agggt[cgt]aa|tt[acg]accct/gi,
        /agggta[cgt]a|t[acg]taccct/gi,
        /agggtaa[cgt]|[acg]ttaccct/gi,
      ];

      const initialLen = data.length;
      data = data.replace(/^>.*\n|\n/gm, '');
      const cleanedLen = data.length;

      for (let j = 0; j < regExps.length; j++) {
        const re = regExps[j];
        const m = data.match(re);
        console.log("print?");
        //     console.log(re.source, m ? m.length : 0);
      }

      const endLen = data
        .replace(/tHa[Nt]/g, '<4>')
        .replace(/aND|caN|Ha[DS]|WaS/g, '<3>')
        .replace(/a[NSt]|BY/g, '<2>')
        .replace(/<[^>]*>/g, '|')
        .replace(/\|[^|][^|]*\|/g, '-').length;

      console.log("terminou");
      // console.log(`\n${initialLen}\n${cleanedLen}\n${endLen}`);
      return 'finished';
    }

  
  }
}


export default startRegex;

