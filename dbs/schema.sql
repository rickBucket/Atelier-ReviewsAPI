
CREATE DATABASE IF NOT EXISTS sdc;

USE sdc;

CREATE TABLE IF NOT EXISTS products (
  product_id INT NOT NULL PRIMARY KEY,
  zero SMALLINT NOT NULL DEFAULT 0,
  one SMALLINT NOT NULL DEFAULT 0,
  two SMALLINT NOT NULL DEFAULT 0,
  three SMALLINT NOT NULL DEFAULT 0,
  four SMALLINT NOT NULL DEFAULT 0,
  five SMALLINT NOT NULL DEFAULT 0,
  recommended SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  review_count SMALLINT NOT NULL DEFAULT 0,
);

-- CREATE TABLE IF NOT EXISTS characteristics (
--   id TINYINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   characteristic VARCHAR(12) NOT NULL,
-- );

CREATE TABLE IF NOT EXIST characteristics (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  characteristic VARCHAR(16) NOT NULL,
  average_value FLOAT(23) NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
);

CREATE TABLE IF NOT EXISTS reviews (
  review_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  rating TINYINT NOT NULL,
  recommended BOOL NOT NULL,
  response TEXT(1000) NOT NULL,
  summary VARCHAR(60) NOT NULL,
  body TEXT(1000) NOT NULL,
  r_date DATETIME NOT NULL,
  reviewer_name VARCHAR(60) NOT NULL,
  helpfulness SMALLINT UNSIGNED NOT NULL, /* Note in journal about choice (scaling) */
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS review_characteristics (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  review_id INT NOT NULL,
  characteristic_id INT NOT NULL,
  rating TINYINT NOT NULL,
  FOREIGN KEY review_id REFERENCES reviews(review_id),
  FOREIGN KEY characteristic_id REFERENCES characteristics(id)
);

/* 263 bytes */
CREATE TABLE IF NOT EXISTS photos (
  photo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(255),
  review_id INT NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

