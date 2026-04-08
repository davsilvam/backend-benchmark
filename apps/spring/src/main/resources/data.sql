INSERT INTO users (name, email, created_at)
SELECT
    'User ' || i,
    'user' || i || '@example.com',
    NOW() - (RANDOM() * INTERVAL '365 days')
FROM generate_series(1, 10000) AS s(i)
ON CONFLICT (email) DO NOTHING;
