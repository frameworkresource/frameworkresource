import bigInt from "big-integer"
import { write } from "./writeFile";

async function pidigits(number) {

  const n = number;

  const char0 = '0'.charCodeAt(0);
  const charT = '\t'.charCodeAt(0);
  const charN = '\n'.charCodeAt(0);
  const charC = ':'.charCodeAt(0);

  let bufSize = (10 + 2 + n.toString().length + 1) * (n / 10);
  for (let i = 10, ii = 10 ** (Math.log10(n) >>> 0); i < ii; i *= 10) {
    bufSize -= i - 1;
  }
  //const buf = Buffer.allocUnsafe(bufSize);
  const buf = new Uint8Array(bufSize);
  let bufOffs = 0;

  let i = 0;
  let k = 0;
  let k2 = 1;
  let acc = new bigInt(0);
  let den = new bigInt(1);
  let num = new bigInt(1);
  let tmp = new bigInt(0);
  let d3 = new bigInt(0);
  let d4 = new bigInt(0);

  while (i < n) {
    k++;
    k2 += 2;

    //BN.addmultiply(acc, num, 2);
    acc = acc.add(num.multiply(2));
    
    //BN.multiply(acc, acc, k2);
    acc = acc.multiply(k2);

    //BN.multiply(den, den, k2);
    den = den.multiply(k2);
    
    //BN.multiply(num, num, k);
    num = num.multiply(k);

    if (num.greater(acc)) {
      continue;
    }

    //BN.multiply(tmp, num, 3);
    tmp = num.multiply(3);
    
    //BN.add(tmp, tmp, acc);
    tmp = tmp.add(acc);

    //BN.divide(d3, tmp, den);
    d3 = tmp.divide(den);


    //BN.add(tmp, tmp, num);
    tmp = tmp.add(num);

    //BN.divide(d4, tmp, den);
    d4 = tmp.divide(den);

    if (!d3.equals(d4)) {
      //attention
      continue;
    }

    const d = Number(d3);

    buf.set([d + char0], bufOffs++);
    //buf.writeInt8(d + char0, bufOffs++);
    i++;
    if (i % 10 === 0) {
      writeLineEnd(i);
    }

    //BN.subtractmultiply(acc, den, d);
    acc = acc.subtract(den.multiply(d));

    //BN.multiply(acc, acc, 10);
    acc = acc.multiply(10);

    //BN.multiply(num, num, 10);
    num = num.multiply(10);

  }

  function writeLineEnd(iParam) {
    //buf.writeInt8(charT, bufOffs++);
    //buf.writeInt8(charC, bufOffs++);

    buf.set([charT], bufOffs++);
    buf.set([charC], bufOffs++);

    let str = iParam.toString();
    for (let index = 0; index < str.length; index++) {
      buf.set([str.charCodeAt(index)], bufOffs++);
    }
    //buf.write(str, bufOffs, bufOffs += str.length);
    //buf.writeInt8(charN, bufOffs++);
    buf.set([charN], bufOffs++);
  }
  await write(convertToString(buf));
  

  return 'finished';
}

function convertToString(array) {
  return String.fromCharCode.apply(null, array);
}

export default pidigits;
