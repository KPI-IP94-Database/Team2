
CREATE TABLE Product (
  name 			varchar(50) 	PRIMARY KEY,
  description 	varchar(50) 	NOT NULL,
  price 		integer 		NOT NULL,
  username 		varchar(50) 	NOT NULL
  );

CREATE TABLE User (
  user_name		varchar(50) 	NOT NULL,
  login			varchar(50) 	PRIMARY KEY, 
  password		varchar(50)		NOT NULL 
  );

CREATE TABLE Rating (
  id			integer 		PRIMARY KEY,
  value 		integer 		NOT NULL,
  user_name 	varchar(50) 	NOT NULL,
  product_name  varchar(50) 	NOT NULL,
  FOREIGN KEY(product_name) REFERENCES Product(name) ON DELETE CASCADE
  );

CREATE TABLE Comment (
  id 			integer 		PRIMARY KEY,
  content 		text,
  user_name 	varchar(50) 	NOT NULL,
  product_name  varchar(50)		NOT NULL,
  FOREIGN KEY(product_name) REFERENCES Product(name) ON DELETE CASCADE
  );