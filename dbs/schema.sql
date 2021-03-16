
CREATE DATABASE IF NOT EXISTS sdc;

USE sdc;

/* extra table */
/* 68 bytes */
CREATE TABLE IF NOT EXISTS meta (
  product_id INT NOT NULL PRIMARY KEY,
  zero SMALLINT NOT NULL DEFAULT 0,
  one SMALLINT NOT NULL DEFAULT 0,
  two SMALLINT NOT NULL DEFAULT 0,
  three SMALLINT NOT NULL DEFAULT 0,
  four SMALLINT NOT NULL DEFAULT 0,
  five SMALLINT NOT NULL DEFAULT 0,
  recommended SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  review_count SMALLINT NOT NULL DEFAULT 0,
  size_id INT,
  size FLOAT(23),
  width_id INT,
  width FLOAT(23),
  comfort_id INT,
  comfort FLOAT(23),
  quality_id INT,
  quality FLOAT(23),
  length_id INT,
  length FLOAT(23),
  fit_id INT,
  fit FLOAT(23)
);

/* 2140 bytes */
CREATE TABLE IF NOT EXISTS reviews (
  review_id INT NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  rating TINYINT NOT NULL,
  recommended BOOL NOT NULL,
  response TEXT(1000) NOT NULL,
  summary VARCHAR(60) NOT NULL,
  body TEXT(1000) NOT NULL,
  r_date DATETIME NOT NULL,
  reviewer_name VARCHAR(60) NOT NULL,
  helpfulness SMALLINT UNSIGNED NOT NULL,
  FOREIGN KEY (product_id) REFERENCES meta(product_id)
);

/* 263 bytes */
CREATE TABLE IF NOT EXISTS photos (
  photo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(255),
  review_id INT NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

/* 13 bytes */
CREATE TABLE IF NOT EXISTS characteristics (
  id INT NOT NULL PRIMARY KEY,
  characteristic_id INT NOT NULL,
  char_val TINYINT NOT NULL,
  review_id INT NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);



/*

10000 products                  10,000 products
1000000 reviews                 1,000 reviews per product
3000000 photos each review      3 photos per review
4000000 charachteristics each   4 characteristics per review

0.7 MB
2.1 GB
0.8 GB
52. MB

total: 3 GB
*/


