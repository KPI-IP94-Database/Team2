DROP DATABASE IF EXISTS store;

CREATE DATABASE store;

USE store;

CREATE TABLE Product(
  name          varchar(50) 	PRIMARY KEY,
  description   varchar(50) 	NOT NULL,
  price         integer 		  NOT NULL
  );

CREATE TABLE User(
  name		      varchar(50) 	NOT NULL,
  login			    varchar(50) 	PRIMARY KEY, 
  password		  varchar(255)	NOT NULL 
  );

CREATE TABLE Rating(
  id		      	integer 		  AUTO_INCREMENT PRIMARY KEY,
  value 		    integer 		  NOT NULL,
  user_login 	  varchar(50)   NOT NULL,
  product_name  varchar(50)   NOT NULL,
  FOREIGN KEY(product_name)   REFERENCES Product(name)  ON DELETE CASCADE,
  FOREIGN KEY(user_login)     REFERENCES User(login)     ON DELETE CASCADE
  );

CREATE TABLE Comment(
  id 			      integer 		  AUTO_INCREMENT PRIMARY KEY,
  content 		  text,
  user_login 	  varchar(50)   NOT NULL,
  product_name  varchar(50)	  NOT NULL,
  FOREIGN KEY(product_name)   REFERENCES Product(name)  ON DELETE CASCADE,
  FOREIGN KEY(user_login)     REFERENCES User(login)     ON DELETE CASCADE
  );
