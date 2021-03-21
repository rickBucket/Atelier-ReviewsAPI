const db = require('../dbs/rdb.js');

function putReport(review_id, callback) {
  if (isNaN(review_id)) {
    callback("Invalid review_id", null);
    return;
  }

  const reportQuery = `
    UPDATE reviews
      SET reported = true
      WHERE review_id = ${review_id};
  `;

  db.connection.query(reportQuery, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports.putReport = putReport;

