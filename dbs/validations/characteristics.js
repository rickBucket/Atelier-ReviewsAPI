const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function checkCharacteristics() {
  const inpath = path.join(__dirname, '../../data/characteristics.csv');
  const outpath = path.join(__dirname, '../../data/fixedCharacteristics.csv');
  const instream = fs.createReadStream(inpath);
  const outstream = fs.createWriteStream(outpath);

  const rl = readline.createInterface({
    input: instream,
    crlfDelay: Infinity
  });

  const characteristics = [`"Fit"`,`"Length"`,`"Comfort"`,`"Quality"`,`"Size"`,`"Width"`];

  rl.on('line', (line) => {
    const row = line.split(',');
    if (row.length !== 3) return;
    if (isNaN(row[0]) || row[0] < 0) return;
    if (isNaN(row[1]) || row[1] < 1) return;
    if (!characteristics.includes(row[2])) return;
    if (row[2][0] !== '"' || row[2][row[2].length-1] !== '"') return;
    outstream.write(`${line}\n`);
  });
}

// -1
checkCharacteristics();

