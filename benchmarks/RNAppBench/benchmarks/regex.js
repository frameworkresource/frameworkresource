import fs from "react-native-fs";
import { write } from "./writeFile";

async function startRegex(fileName) {

  const ret = await fs.readFileAssets('files/' + fileName + '.txt', "utf8");
  await regex(ret);

  return 'finished';
}

async function regex(data) {

  var output;

  await mainThread(data);

  async function mainThread(data) {
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
      output += re.source + " " + (m ? m.length : 0) + "\n";
    }

    const endLen = data
      .replace(/tHa[Nt]/g, '<4>')
      .replace(/aND|caN|Ha[DS]|WaS/g, '<3>')
      .replace(/a[NSt]|BY/g, '<2>')
      .replace(/<[^>]*>/g, '|')
      .replace(/\|[^|][^|]*\|/g, '-').length;

    output += `\n${initialLen}\n${cleanedLen}\n${endLen}`;

    await write(output); 

    return 'finished';
  }


}



export default startRegex;

