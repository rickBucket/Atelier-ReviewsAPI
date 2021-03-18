USE sdc;

/* update meta table */

/* 1,000,011 */
LOAD DATA LOCAL INFILE '../data/fixedProduct.csv'
INTO TABLE products
LINES TERMINATED BY '\n';

/* 4,656,462 */
LOAD DATA LOCAL INFILE '../data/fixedReviews.csv'
INTO TABLE reviews
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n';

/* 3,347,478 */
LOAD DATA LOCAL INFILE '../data/fixedCharacteristics.csv'
INTO TABLE characteristics
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n';

/* 15,585,582 */
LOAD DATA LOCAL INFILE '../data/fixedCharacteristic_reviews.csv'
INTO TABLE review_characteristics
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';

/* 2,210,965 */
LOAD DATA LOCAL INFILE '../data/fixedReviews_photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n';