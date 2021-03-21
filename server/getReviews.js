const db = require('../dbs/rdb.js');

function getReviews(q, callback) {
  let sort = '';
  if (q.sort === 'newest') {
    sort = 'r_date DESC';
  } else if (q.sort === 'helpful') {
    sort = 'helpfulness DESC';
  } else {
    sort = 'helpfulness DESC, r_date DESC';
  }
  const count = q.count || 5;
  const page = q.page || 1;

  const reviewQuery = `
    WITH top_reviews AS (
      SELECT *
      FROM reviews
      WHERE product_id = ${q.product_id}
      ORDER BY ${sort}
      LIMIT ${count * page}
    ), review_photos AS (
      SELECT
        GROUP_CONCAT(photos.url) AS photo_list,
        photos.review_id AS r_id,
        GROUP_CONCAT(photos.photo_id) AS photo_ids
      FROM photos
        JOIN top_reviews
        ON photos.review_id = top_reviews.review_id
      GROUP BY photos.review_id
    )
    SELECT *
    FROM review_photos
      RIGHT JOIN top_reviews
      ON review_photos.r_id = top_reviews.review_id;`;

  db.connection.query(reviewQuery, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, formatResult(result, Number(page), Number(count), q.product_id));
    }
  });
}

function formatResult(res, page, count, product) {
  let results = [];
  const start = count * (page - 1);
  const end = count * page;


  for (let i = start; i < end; i++) {
    if (!res[i]) break;
    if (res[i].reported) continue;
    const photos = [];
    if (typeof res[i].photo_list === 'string') {
      const urls = res[i].photo_list.split(',');
      const p_ids = res[i].photo_ids.split(',');

      for (let j = 0; j < urls.length; j++) {
        photos.push({
          id: Number(p_ids[j]),
          url: urls[j]
        });
      }
    }

    results.push({
      review_id: res[i].review_id,
      rating: res[i].rating,
      summary: res[i].summary,
      recommend: convertBool(res[i].recommend),
      response: isNull(res[i].response),
      body: res[i].body,
      date: res[i].r_date,
      reviewer_name: res[i].reviewer_name,
      helpfulness: res[i].helpfulness,
      photos: photos
    });
  }

  return {
    product,
    page,
    count,
    results
  };
}

function convertBool(input) {
  if (input === 0 || input === '0') {
    return false;
  } else if (input === 1 || input === '1') {
    return true;
  } else {
    return input;
  }
}

function isNull(input) {
  if (input === 'null') {
    return null;
  } else {
    return input;
  }
}

module.exports.getReviews = getReviews;

