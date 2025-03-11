CREATE DATABASE project_login;
USE project_login;

CREATE TABLE user (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    numberPhone VARCHAR(255) NULL,
    age INT NOT NULL,
    uniqueIdentification VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL
);
