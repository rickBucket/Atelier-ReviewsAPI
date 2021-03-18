const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function checkCharacteristicReviews() {
  const inpath = path.join(__dirname, '../../data/characteristic_reviews.csv');
  const outpath = path.join(__dirname, '../../data/fixedCharacteristic_reviews.csv');
  const instream = fs.createReadStream(inpath);
  const outstream = fs.createWriteStream(outpath);

  const rl = readline.createInterface({
    input: instream,
    output: outstream,
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    const row = line.split(',');
    if (row.length !== 4) return;
    if (isNaN(row[0]) || row[0] < 1) return;
    if (isNaN(row[1]) || row[1] < 1) return;
    if (isNaN(row[2]) || row[2] < 1) return;
    if (isNaN(row[3]) || row[3] > 5 || row[3] < 0) return;
    outstream.write(`${line}\n`);
  });
}

// -1
checkCharacteristicReviews();

