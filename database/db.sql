CREATE TABLE reportes(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(200),
  academy VARCHAR(100),
  course VARCHAR(100),
  cycle VARCHAR(100),
  -- files 
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);