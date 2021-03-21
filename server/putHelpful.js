const db = require('../dbs/rdb.js');

function putHelpful(review_id, callback) {
  if (isNaN(review_id)) {
    callback("Invalid review_id", null);
    return;
  }

  const helpfulQuery = `
    UPDATE reviews
      SET helpfulness = helpfulness + 1
      WHERE review_id = ${review_id};
  `;

  db.connection.query(helpfulQuery, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports.putHelpful = putHelpful;

