const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log("hello");

  const metaSchema = new mongoose.Schema({
    product_id: Number,
    average_ratings: {
      "0": Number,
      "1": Number,
      "2": Number,
      "3": Number,
      "4": Number,
      "5": Number
    },
    recommended: Number,
    review_count: Number,
    characteristics: {
      Size: {
        id: Number,
        value: Number
      },
      Width: {
        id: Number,
        value: Number
      },
      Comfort: {
        id: Number,
        value: Number
      },
      Quality: {
        id: Number,
        value: Number
      },
      Length: {
        id: Number,
        value: Number
      },
      Fit: {
        id: Number,
        value: Number
      },
    }
  });

  const reviewSchema = new mongoose.Schema({
    review_id: Number,
    product_id: Number,
    rating: Number,
    recommended: Boolean,
    response: String,
    summary: String,
    body: String,
    date: Date,
    reviewer_name: String,
    helpfulness: Number,
    characteristics: {
      Size: {
        id: Number,
        value: Number
      },
      Width: {
        id: Number,
        value: Number
      },
      Comfort: {
        id: Number,
        value: Number
      },
      Quality: {
        id: Number,
        value: Number
      },
      Length: {
        id: Number,
        value: Number
      },
      Fit: {
        id: Number,
        value: Number
      },
    },
    photos: [String] // may have an easier way to handle URL input
  });

  const Meta = mongoose.model('Meta', metaSchema);
  const Review = mongoose.model('Review', reviewSchema);

  const testData = new Review({
    review_id: 1234,
    product_id: 5678,
    rating: 4,
    recommended: true,
    response: "response",
    summary: "summary",
    body: "body",
    date: 2019,
    reviewer_name: "name",
    helpfulness: 14,
    characteristics: {
      Size: {
        id: 12,
        value: 4
      },
      Width: {
        id: 13,
        value: 4
      },
      Comfort: {
        id: 14,
        value: 2
      },
      Quality: {
        id: 15,
        value: 3
      },
      Length: {
        id: 16,
        value: 3
      },
      Fit: {
        id: 17,
        value: 3
      },
    },
    photos: ["url"]
  });

  const testMeta = new Meta({
    product_id: 1234,
    ratings: {
      "0": 45,
      "1": 23,
      "2": 13,
      "3": 12,
      "4": 15,
      "5": 25
    },
    recommended: 24,
    review_count: 53,
    characteristics: {
      Size: {
        id: 12,
        value: 1.2
      },
      Width: {
        id: 13,
        value: 5.0
      },
      Comfort: {
        id: 14,
        value: 5.2
      },
      Quality: {
        id: 15,
        value: 1.2
      },
      Length: {
        id: 16,
        value: 2.3
      },
      Fit: {
        id: 17,
        value: 4.3
      },
    }
  });
  testData.save();
  testMeta.save();

  console.log("hmm");
});

