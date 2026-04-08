CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, created_at)
SELECT
  'User ' || i,
  'user' || i || '@example.com',
  NOW() - (RANDOM() * INTERVAL '365 days')
FROM generate_series(1, 10000) AS s(i);
