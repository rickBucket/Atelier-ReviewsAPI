
CREATE DATABASE IF NOT EXISTS sdc;

USE sdc;

CREATE TABLE IF NOT EXISTS products (
  product_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
);

CREATE TABLE IF NOT EXISTS characteristics (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  characteristic VARCHAR(16) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
  review_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  rating TINYINT UNSIGNED NOT NULL,
  r_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  summary VARCHAR(60) NOT NULL,
  body TEXT(1000) NOT NULL,
  recommend BOOL NOT NULL,
  reported BOOL NOT NULL,
  reviewer_name VARCHAR(60) NOT NULL,
  reviewer_email VARCHAR(60) NOT NULL,
  response VARCHAR(120),
  helpfulness INT UNSIGNED NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);
CREATE INDEX rating_index ON reviews(rating);
CREATE INDEX r_date_index ON reviews(r_date);
CREATE INDEX help_index on reviews(helpfulness);

CREATE TABLE IF NOT EXISTS review_characteristics (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  characteristic_id INT UNSIGNED NOT NULL,
  review_id INT UNSIGNED NOT NULL,
  CONSTRAINT relation UNIQUE KEY (characteristic_id, review_id),
  rating TINYINT UNSIGNED NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(review_id) ON DELETE CASCADE,
  FOREIGN KEY (characteristic_id) REFERENCES characteristics(id) ON DELETE CASCADE
);
CREATE INDEX char_index ON review_characteristics(characteristic_id);

CREATE TABLE IF NOT EXISTS photos (
  photo_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  review_id INT UNSIGNED NOT NULL,
  url VARCHAR(255),
  FOREIGN KEY (review_id) REFERENCES reviews(review_id) ON DELETE CASCADE
);
CREATE INDEX review_index ON photos(review_id);

/* ALTER TABLE reviews ADD INDEX rating (rating); */
/*  mysql -u root < this file */

-- SELECT table_schema AS "Database",
-- ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS "Size (MB)"
-- FROM information_schema.TABLES
-- GROUP BY table_schema;

-- WITH top_reviews AS (
--     SELECT * FROM reviews
--     WHERE product_id = 51
--     ORDER BY reviews.r_date DESC, reviews.helpfulness DESC
--     LIMIT 5
--   ), review_photos AS (
--     SELECT
--       GROUP_CONCAT(photos.url) AS photo_list,
--       photos.review_id AS extra,
--       GROUP_CONCAT(photos.photo_id) AS photo_ids
--     FROM photos
--       JOIN top_reviews
--       ON photos.review_id = top_reviews.review_id
--     GROUP BY photos.review_id
--   )
--   SELECT *
--   FROM review_photos
--     RIGHT JOIN top_reviews
--     ON review_photos.extra = top_reviews.review_id;


