-- seeds
USE review_fetch;

SET foreign_key_checks = 0;

-- insert into parent table
INSERT INTO contacts (name, gender, email, phone, status, active, CompanyId) VALUES ('n1', '1', "n1@mail.com", "000-000-0000", 'Not Sent', 1, 1);
INSERT INTO contacts (name, gender, email, phone, status, active, CompanyId) VALUES ('n2', '1', "n2@mail.com", "000-000-0000", 'Not Sent', 1, 1);
INSERT INTO contacts (name, gender, email, phone, status, active, CompanyId) VALUES ('n3', '1', "n3@mail.com", "000-000-0000", 'Not Sent', 1, 2);
INSERT INTO contacts (name, gender, email, phone, status, active, CompanyId) VALUES ('n4', '1', "n4@mail.com", "000-000-0000", 'Not Sent', 1, 2);

INSERT INTO companies (name, UserId) VALUES ('C1', '1');
INSERT INTO companies (name, UserId) VALUES ('C2', '1');
select * from contacts;
