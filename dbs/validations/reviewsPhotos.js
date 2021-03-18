const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function checkReviewsPhotos() {
  const inpathing = path.join(__dirname, '../../data/reviews_photos.csv');
  const instream = fs.createReadStream(inpathing);

  const rl = readline.createInterface({
    input: instream,
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    const row = line.split(',');
    const id = row[0];
    if (row.length !== 3) return;
    if (isNaN(row[0]) || row[0] < 0) return;
    if (isNaN(row[1]) || row[1] < 0) return;
    if (!validateURL(row[2].split('"').join(''))) return;
  });
}

function validateURL(input) {
  let url;
  try {
    url = new URL(input);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

// 2,742,833
checkReviewsPhotos();

console.log('hi');
