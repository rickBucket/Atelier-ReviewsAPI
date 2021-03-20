const express = require('express');
const getReviews = require('./getReviews.js').getReviews;
const getMeta = require('./getMeta.js').getMeta;

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
  // req.body
});

app.put('/:review_id/helpful', (req, res) => {
  //
});

app.put('/:review_id/report', (req, res) => {
  //
});

app.listen(3000);