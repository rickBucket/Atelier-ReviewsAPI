const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function checkReviews() {
  const inpath = path.join(__dirname, '../../data/reviews.csv');
  const outpath = path.join(__dirname, '../../data/fixedReviews.csv');
  const instream = fs.createReadStream(inpath);
  const outstream = fs.createWriteStream(outpath);

  const rl = readline.createInterface({
    input: instream,
    output: outstream,
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    const row = line.split(',');
    if (row.length !== 12) return;
    if (isNaN(row[0])) return;
    if (isNaN(row[1])) return;
    if (isNaN(row[2]) || row[2] > 5 || row[2] < 1) return;
    if (!valiDate(row[3])) return;
    if (row[4].length > 62 || row[4].length < 2) return;
    if (row[4][0] !== '"' || row[4][row[4].length-1] !== '"') return;
    if (row[5].length < 52 || row[5].length > 1002) return;
    if (row[5][0] !== '"' || row[5][row[5].length-1] !== '"') return;
    if (row[6] != 0 && row[6] != 1 && row[6] !== 'true' && row[6] !== 'false') return;
    if (isNaN(row[7]) && row[7] !== 'true' && row[7] !== 'false') return;
    if (row[8].length > 62) return;
    if (row[9].length > 62 || !row[9].includes('@')) return;
    if (row[10].length > 122) return;
    if (isNaN(row[11]) || row[11] < 0) return;
    outstream.write(`${line}\n`);
  });
}

function valiDate(input) {
  if (input.includes('/')) console.log("SLASHES");
  input = input.split('"').join('');
  const sections = input.split('-');
  if (sections.length !== 3) return false;
  if (isNaN(sections[0])) return false;
  if (isNaN(sections[1])) return false;
  if (sections[1] > 12 || sections[1] < 1) return false;
  if (sections[2] > 31 || sections[2] < 1) return false;
  return true;
}

// 4,656,462
checkReviews();

