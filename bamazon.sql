DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  subdepartment VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  stock_quantity INT(4) DEFAULT 0,
  product_sales DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Bamazon Gecho", "Technology", "Speaker", "69.99", "200"),
    ("Bamazon Pyre", "Technology", "Tablets", "119.99", "150"),
    ("Bamazon Spindle", "Technology", "eReader", "79.99", "100"),
    ("Bamazon Bash", "Technology", "Buttons", "4.99", "200"),
    ("Himalayan Salt Lamp", "Home and Garden", "Lighting", "15.00", "70"),
    ("Disco Ball", "Home and Garden", "Lighting", "12.00", "50"),
    ("A Christmas Story Lamp", "Home and Garden", "Lighting", "39.95", "100"),
    ("EVGA GTX 1060 3GB", "Technology", "Graphic Cards", "209.99", "80"),
    ("EVGA GTX 1070 6GB", "Technology", "Graphic Cards", "269.99", "150"),
    ("EVGA GTX 1080ti 8GB", "Technology", "Graphic Cards", "449.99", "14"),
    ("AMD Ryzen 2600x", "Technology", "Computer Processor", "199.99", "60"),
    ("Intel i9-9700k", "Technology", "Computer Processor", "369.99", "40");

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(45) NOT NULL,
    over_head_costs DEC(10,2) DEFAULT 0
);
