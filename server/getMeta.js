const db = require('../dbs/rdb.js');

function getMeta(q, callback) {
  const ratingQuery = `
    SELECT
      reviews.rating,
      COUNT(review_id) AS sum
    FROM reviews
    WHERE reviews.product_id = ${q.product_id}
    GROUP BY reviews.rating
    ORDER BY reviews.rating ASC;`;

  const charQuery = `
    WITH vals AS (
      SELECT
        AVG(rating) AS avg,
        characteristic_id AS val_id
      FROM review_characteristics
      WHERE review_characteristics.review_id
      IN (
        SELECT reviews.review_id
        FROM reviews
        WHERE reviews.product_id = ${q.product_id}
      )
      AND review_characteristics.characteristic_id
      IN (
        SELECT characteristics.id
        FROM characteristics
        WHERE characteristics.product_id = ${q.product_id}
      )
      GROUP BY review_characteristics.characteristic_id
    ), chars AS (
      SELECT
        characteristics.characteristic AS prop,
        characteristics.id AS char_id
      FROM characteristics
      WHERE characteristics.product_id = ${q.product_id}
    )
    SELECT
      chars.char_id,
      chars.prop,
      vals.avg
    FROM vals
    JOIN chars
    ON vals.val_id = chars.char_id;`;

  const recQuery = `
    SELECT
      SUM(recommend = 1) AS "true",
      SUM(recommend = 0) AS "false"
    FROM reviews
    WHERE reviews.product_id = ${q.product_id};`;

  const promiseRating = new Promise((resolve, reject) => {
    db.connection.query(ratingQuery, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
  const promiseChar = new Promise((resolve, reject) => {
    db.connection.query(charQuery, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
  const promiseRec = new Promise((resolve, reject) => {
    db.connection.query(recQuery, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });

  Promise.all([promiseRating, promiseChar, promiseRec])
    .then(results => callback(null, formatData(results, q.product_id)))
    .catch(err => callback(err, null));
}

function formatData(input, product_id) {
  let ratings = {};
  let characteristics = {};
  if (input[0].length > 0) {
    for (let i = 0; i < input[0].length; i++) {
      ratings[input[0][i].rating] = input[0][i].sum.toString();
    }
  }
  if (input[1].length > 0) {
    for (let i = 0; i < input[1].length; i++) {
      characteristics[input[1][i].prop] = {
        id: input[1][i].char_id,
        value: input[1][i].avg.toString()
      };
    }
  }
  console.log(input);
  if (input[2][0].true === null) {
    input[2][0] = {};
  } else {
    input[2][0].true = input[2][0].true.toString();
    input[2][0].false = input[2][0].false.toString();
  }
  return {
    product_id,
    ratings,
    recommended: input[2][0],
    characteristics
  };
}

module.exports.getMeta = getMeta;

