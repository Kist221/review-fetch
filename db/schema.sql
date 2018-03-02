DROP DATABASE IF EXISTS review_fetch;
CREATE DATABASE review_fetch;
USE review_fetch;

CREATE TABLE fetch_users(
	user_id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	bool BOOLEAN DEFAULT false,
	PRIMARY KEY (user_id)
);

CREATE TABLE fetch_company(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	bool BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

CREATE TABLE fetch_contact_data(
	contact_id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	gender BOOLEAN,
	email varchar(255) NOT NULL,
	phone varchar(20),
	PRIMARY KEY (contact_id),
    user_id int NOT NULL,
    FOREIGN KEY FK_userId (user_id)
    REFERENCES fetch_users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);