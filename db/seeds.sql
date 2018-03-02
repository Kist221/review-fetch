-- seeds
USE review_fetch;

SET foreign_key_checks = 0;

-- insert into parent table
INSERT INTO fetch_users (username, password, bool) VALUES ('username1', 'password1', 0);
INSERT INTO fetch_users (username, password, bool) VALUES ('username2', 'password2', 0);
INSERT INTO fetch_users (username, password, bool) VALUES ('username3', 'password3', 0);

-- Insert into child table.
INSERT INTO fetch_contact_data (name, gender, email, phone, user_id) VALUES ('User Name 1', 1, 'email1@email.com', '(520)-444-4444', 1);
INSERT INTO fetch_contact_data (name, gender, email, phone, user_id) VALUES ('User Name 2', 1, 'email2@email.com', '(520)-555-5555', 2);
INSERT INTO fetch_contact_data (name, gender, email, phone, user_id) VALUES ('User Name 3', 0, 'email3@email.com', '(520)-666-6666', 3);

-- insert into company table
INSERT INTO fetch_company (name, bool) VALUES ('My Company', 0);

select * from fetch_users;
select * from fetch_contact_data;