const express = require('express');
const getReviews = require('./getReviews.js').getReviews;
const getMeta = require('./getMeta.js').getMeta;
const postReview = require('./postReview.js').postReview;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  // req.query = { page, count, sort, product_id }
  getReviews(req.query, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/meta', (req, res) => {
  // req.query = { product_id }
  getMeta(req.query, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/', (req, res) => {
  // req.body:
  // product_id int
  // rating int
  // summary text
  // body text
  // recommend bool
  // name text
  // email text

  // photos [text]

  // characteristics object { id: value }
  postReview(req.body, (err, result) => {
    if (err) {
      res.status(405).send(err);
    } else {
      res.status(201).send(result);
    }
  })
});

app.put('/:review_id/helpful', (req, res) => {
  //
});

app.put('/:review_id/report', (req, res) => {
  //
});

app.listen(3000);