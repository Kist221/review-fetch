### Schema
DROP DATABASE IF EXISTS review_fetch;
CREATE DATABASE review_fetch;
USE review_fetch;

CREATE TABLE fetch_users(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	bool BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

CREATE TABLE fetch_company(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	bool BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

-- FEMALE = 0 && MALE = 1
CREATE TABLE fetch_client_data(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	gender BOOLEAN,
	email varchar(255) NOT NULL,
	phone varchar(12),
	PRIMARY KEY (id)
);