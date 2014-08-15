CREATE DATABASE chat;

USE chat;


CREATE TABLE users (
  /* Describe your table here.*/
  user_id INT NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE messages (
  /* Describe your table here.*/
  message_id INT NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  message VARCHAR(100) NOT NULL,
  roomname VARCHAR(100) NOT NULL
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
