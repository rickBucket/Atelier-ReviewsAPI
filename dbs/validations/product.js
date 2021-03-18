const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function checkProduct() {
  const inpath = path.join(__dirname, '../../data/product.csv');
  const outpath = path.join(__dirname, '../../data/fixedProduct.csv');
  const instream = fs.createReadStream(inpath);
  const outstream = fs.createWriteStream(outpath);

  const rl = readline.createInterface({
    input: instream,
    output: outstream,
    crlfDelay: Infinity
  });


  rl.on('line', (line) => {
    const row = line.split(',');
    if (isNaN(row[0]) || row[0] < 1) return;
    outstream.write(`${row[0]}\n`);
  });
}

// -1
checkProduct();

