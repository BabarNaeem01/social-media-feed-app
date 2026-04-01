CREATE DATABASE IF NOT EXISTS assignment3_app2;
USE assignment3_app2;

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  body TEXT NOT NULL
);

INSERT INTO posts (user_id, title, body) VALUES
(1, 'Welcome to the app', 'This is the first seeded post stored inside the local MySQL database.'),
(2, 'Weekend moments', 'Had a great time building mobile screens and learning how APIs connect to React Native.'),
(3, 'Study reminder', 'Finish Assignment 3 by connecting every screen to its own isolated database.');
