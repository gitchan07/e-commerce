use vapestore;
SELECT * FROM users
;
INSERT INTO users (id, username, role, email, full_name, address, password_hash, created_at, updated_at)
VALUES (1,'example_user', 'seller', 'example_user@example.com', 'Example User', '123 Main St', 'hashed_password', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Now, insert new data
INSERT INTO Products (user_id, category_id, title, description, stock, price, img_path, is_active, created_at, updated_at)
VALUES
(1, 1, 'elektronik', 'A description', 50, 29.99, 'product_image.jpg', 1, '2024-08-11 13:44:15', '2024-08-13 19:23:33'),
(1, 2, 'New elektronik', 'A description', 50, 29.99, 'product_image.jpg', 1, '2024-08-11 13:44:16', '2024-08-13 19:23:33'),
(1, 3, 'elektronik Product', 'A description', 50, 29.99, 'product_image.jpg', 1, '2024-08-11 13:44:16', '2024-08-13 19:23:33'),
(1, 4, 'catok', 'A description', 50, 29.99, 'product_image.jpg', 1, '2024-08-11 13:44:17', '2024-08-13 19:23:33'),
(1, 5, 'baju', 'A description', 50, 29.99, 'product_image.jpg', 1, '2024-08-11 13:44:17', '2024-08-13 19:23:33'),
(1, 1, 'ecofiendly', 'A description', 50, 29.99, 'product_image.jpg', 1, '2024-08-13 18:47:18', '2024-08-13 19:23:33'),
(1, 1, 'xdd', 'A description', 50, 29.99, 'product_image.jpg', 1, '2024-08-13 18:47:18', '2024-08-13 19:23:33'),
(1, 1, 'xdd', 'A description', 50, 29.99, 'product_image.jpg', 1, '2024-08-13 18:47:18', '2024-08-13 19:23:33'),
(1, 1, 'haha', 'A description', 50, 29.99, 'product_image.jpg', 1, '2024-08-13 18:47:18', '2024-08-13 19:23:33'),
(1, 1, 'xd', 'A description', 50, 29.99, '/product_image.jpg', 1, '2024-08-13 18:47:18', '2024-08-13 19:23:33'),
(1, 1, 'sss', 'A description', 50, 29.99, 'product_image.jpg', 1, '2024-08-13 18:47:18', '2024-08-13 19:23:33');


INSERT INTO categories (name, created_at, updated_at)
VALUES
('Electronics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Books', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Clothing', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);