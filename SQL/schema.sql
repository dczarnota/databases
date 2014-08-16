CREATE DATABASE chat;

USE chat;


CREATE TABLE users (
  /* Describe your table here.*/
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE messages (
  /* Describe your table here.*/
  message_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id INT NOT NULL,
  FOREIGN KEY (id) REFERENCES users(id),
  message VARCHAR(100) NOT NULL,
  roomname VARCHAR(100) NOT NULL
);

users.hasMany(Task, Message, OtherTables...)
Task.belongsTo(User)


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
