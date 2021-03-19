USE sdc;

/* update meta table */

/* 1,000,011 */
LOAD DATA LOCAL INFILE '../../data/fixedProduct.csv'
INTO TABLE products
LINES TERMINATED BY '\n';

/* 4,656,462 */
LOAD DATA LOCAL INFILE '../../data/fixedReviews.csv'
INTO TABLE reviews
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n';

/* 3,347,478 */
LOAD DATA LOCAL INFILE '../../data/fixedCharacteristics.csv'
INTO TABLE characteristics
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n';

/* 15,585,582 */
LOAD DATA LOCAL INFILE '../../data/fixedCharacteristic_reviews.csv'
INTO TABLE review_characteristics
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';

/* 2,210,965 */
LOAD DATA LOCAL INFILE '../../data/fixedReviews_photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n';

UPDATE products SET one = (
	SELECT COUNT(*) FROM reviews
  	WHERE reviews.product_id = products.product_id
  	AND reviews.rating = 1
);

UPDATE products SET two = (
	SELECT COUNT(*) FROM reviews
  	WHERE reviews.product_id = products.product_id
  	AND reviews.rating = 2
);

UPDATE products SET three = (
	SELECT COUNT(*) FROM reviews
  	WHERE reviews.product_id = products.product_id
  	AND reviews.rating = 3
);

UPDATE products SET four = (
	SELECT COUNT(*) FROM reviews
  	WHERE reviews.product_id = products.product_id
  	AND reviews.rating = 4
);

UPDATE products SET five = (
	SELECT COUNT(*) FROM reviews
  	WHERE reviews.product_id = products.product_id
  	AND reviews.rating = 5
);

UPDATE characteristics SET one = (
  SELECT COUNT(*) FROM review_characteristics
  WHERE review_characteristics.characteristic_id = characteristics.id
  AND review_characteristics.rating = 1
);

UPDATE characteristics SET two = (
  SELECT COUNT(*) FROM review_characteristics
  WHERE review_characteristics.characteristic_id = characteristics.id
  AND review_characteristics.rating = 2
);

UPDATE characteristics SET three = (
  SELECT COUNT(*) FROM review_characteristics
  WHERE review_characteristics.characteristic_id = characteristics.id
  AND review_characteristics.rating = 3
);

UPDATE characteristics SET four = (
  SELECT COUNT(*) FROM review_characteristics
  WHERE review_characteristics.characteristic_id = characteristics.id
  AND review_characteristics.rating = 4
);

UPDATE characteristics SET five = (
  SELECT COUNT(*) FROM review_characteristics
  WHERE review_characteristics.characteristic_id = characteristics.id
  AND review_characteristics.rating = 5
);

/* Validating that the unique characteristics are only set one per review */
-- SELECT characteristic_id, review_id, COUNT(*)
-- FROM review_characteristics
-- GROUP BY characteristic_id, review_id
-- HAVING COUNT(*) > 1;

/* Validating that characteristics in reviews are actually those of the product */
-- SELECT * FROM review_characteristics, reviews, characteristics
-- WHERE review_characteristics.characteristic_id = characteristics.id
-- AND review_characteristics.review_id = reviews.review_id
-- AND reviews.product_id != characteristics.product_id;