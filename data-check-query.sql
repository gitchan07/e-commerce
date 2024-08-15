use vapestore;
SELECT * FROM products
;
INSERT INTO users (id, username, role, email, full_name, address, password_hash, created_at, updated_at)
VALUES (3, 'example_user', 'buyer', 'example_user@example.com', 'Example User', '123 Main St', 'hashed_password', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Now, insert new data
INSERT INTO Products (user_id, category_id, title, description, stock, price, img_path, is_active, created_at, updated_at)
VALUES
(3, NULL, 'wicaksono', 'A description', 50, 29.99, 'static/upload_image/product_image.jpg', 1, '2024-08-11 13:44:15', '2024-08-13 19:23:33'),
(3, NULL, 'New Product', 'A description', 50, 29.99, 'static/upload_image/product_image.jpg', 1, '2024-08-11 13:44:16', '2024-08-13 19:23:33'),
(3, NULL, 'New Product', 'A description', 50, 29.99, 'static/upload_image/product_image.jpg', 1, '2024-08-11 13:44:16', '2024-08-13 19:23:33'),
(3, NULL, 'New Product', 'A description', 50, 29.99, 'static/upload_image/product_image.jpg', 1, '2024-08-11 13:44:17', '2024-08-13 19:23:33'),
(3, NULL, 'New Product', 'A description', 50, 29.99, 'static/upload_image/product_image.jpg', 1, '2024-08-11 13:44:17', '2024-08-13 19:23:33'),
(3, NULL, 'New Product 1', 'A description', 50, 29.99, 'static/upload_image/product_image.jpg', 1, '2024-08-13 18:47:18', '2024-08-13 19:23:33'),
(3, NULL, 'New Product 2', 'A description', 50, 29.99, 'static/upload_image/product_image.jpg', 1, '2024-08-13 18:47:18', '2024-08-13 19:23:33'),
(3, NULL, 'New Product 3', 'A description', 50, 29.99, 'static/upload_image/product_image.jpg', 1, '2024-08-13 18:47:18', '2024-08-13 19:23:33'),
(3, NULL, 'New Product 100', 'A description', 50, 29.99, 'static/upload_image/product_image.jpg', 1, '2024-08-13 18:47:18', '2024-08-13 19:23:33'),
(3, NULL, 'New Product 1', 'A description', 50, 29.99, 'static/upload_image/product_image.jpg', 1, '2024-08-13 18:47:18', '2024-08-13 19:23:33'),
(3, NULL, 'New Product 2', 'A description', 50, 29.99, 'static/upload_image/product_image.jpg', 1, '2024-08-13 18:47:18', '2024-08-13 19:23:33');

INSERT INTO categories (name, created_at, updated_at)
VALUES
('Electronics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Books', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Clothing', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);