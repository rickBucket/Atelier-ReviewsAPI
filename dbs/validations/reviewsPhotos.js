const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function checkReviewsPhotos() {
  const inpath = path.join(__dirname, '../../data/reviews_photos.csv');
  const outpath = path.join(__dirname, '../../data/fixedReviews_photos.csv');
  const instream = fs.createReadStream(inpath);
  const outstream = fs.createWriteStream(outpath);

  const rl = readline.createInterface({
    input: instream,
    output: outstream,
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    const row = line.split(',');
    if (row.length !== 3) return;
    if (isNaN(row[0]) || row[0] < 0) return;
    if (isNaN(row[1]) || row[1] < 0) return;
    if (row[2][0] !== '"' || row[2][row[2].length-1] !== '"') return;
    if (!validateURL(row[2].split('"').join(''))) return;
    outstream.write(`${line}\n`);
  });
}

function validateURL(input) {
  if (input.length > 255) return false;
  let url;
  try {
    url = new URL(input);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

// -1
checkReviewsPhotos();
