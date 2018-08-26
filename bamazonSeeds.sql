DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(60),
  price DECIMAL(10,2),
  product_sales DECIMAL(17,2);
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("ANC Professional Nail Dip System Kit", "Beauty", 106.94, 0, 100);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("NuWallpaper NU1647 Beechwood Peel and Stick Wallpaper", "Tools & Home Improvement", 27.28, 0, 120);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("LeapFrog 2-in-1 LeapTop Touch, Pink", "Toys & Games", 24.99, 0, 75);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("NOW Super Enzymes, 180 Capsules", "Health & Personal Care", 16.92, 0, 50);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Little Treasures 103 Imaginative Arts Pottery Wheel", "Toys & Games", 19.99, 0, 25);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("8 x 10 Inch Stretched Canvas Value Pack of 10", "Arts, Crafts & Sewing", 15.95, 0, 10);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Words Of Knowledge: Training Manual (Love Pursuit Series)", "Books", 9.99, 0, 10);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Montreal Metal and Mosaic 4 Seat Garden Bistro Set Garden Patio by Li-Lo Leisure", "Home & Kitchen", 667.88, 0, 5);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Black and Decker TO1313SBD 4-Slice Toaster Oven", "Home & Kitchen", 29.99, 0, 40);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity)
VALUES ("Bare Cotton Turkish Cotton Bath Towels, White, Piano, Set of 4", "Home & Kitchen", 42.99, 0, 30);


CREATE TABLE departments (
  department_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(60),
  over_head_costs INTEGER(10),
  price DECIMAL(10,2),
  stock_quantity INTEGER(10),
  PRIMARY KEY (department_id)
);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);

