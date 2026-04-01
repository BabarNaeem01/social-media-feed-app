CREATE DATABASE IF NOT EXISTS assignment3_app2;
USE assignment3_app2;

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  body TEXT NOT NULL
);

INSERT INTO posts (user_id, title, body) VALUES
(1, 'Welcome to the app', 'This feed is powered by a separate mysql2 database connection for app 2.'),
(2, 'Weekend moments', 'React Native frontend opens the details screen with React Navigation.'),
(3, 'Study reminder', 'Every numbered app has its own schema and its own server.js.');
