const express = require('express');
const api = require('./api.js');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  // req.query = { page, count, sort, product_id }
});

app.get('/meta', (req, res) => {
  // req.query = { product_id }
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