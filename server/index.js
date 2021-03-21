const express = require('express');
const getReviews = require('./getReviews.js').getReviews;
const getMeta = require('./getMeta.js').getMeta;
const postReview = require('./postReview.js').postReview;
const putHelpful = require('./putHelpful.js').putHelpful;
const putReport = require('./putReport.js').putReport;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  getReviews(req.query, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/meta', (req, res) => {
  getMeta(req.query, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/', (req, res) => {
  postReview(req.body, (err, result) => {
    if (err) {
      res.status(405).send(err);
    } else {
      res.status(201).send(result);
    }
  })
});

app.put('/:review_id/helpful', (req, res) => {
  putHelpful(req.params.review_id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.put('/:review_id/report', (req, res) => {
  putReport(req.params.review_id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.listen(3000);