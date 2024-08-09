USE vapestore;

-- Insert dummy data into Users table
INSERT INTO users (username, role, email, full_name, address, password_hash)
VALUES 
    ('john_doe', 'customer', 'john.doe@example.com', 'John Doe', '123 Elm St, Springfield', 'hashedpassword1'),
    ('jane_smith', 'admin', 'jane.smith@example.com', 'Jane Smith', '456 Oak St, Springfield', 'hashedpassword2'),
    ('mike_jones', 'customer', 'mike.jones@example.com', 'Mike Jones', '789 Maple St, Springfield', 'hashedpassword3');

-- Insert dummy data into Categories table
INSERT INTO categories (name)
VALUES 
    ('E-Liquids'),
    ('Vape Mods'),
    ('Accessories');

-- Insert dummy data into Products table
INSERT INTO products (user_id, category_id, title, description, stock, price)
VALUES 
    (2, 1, 'Minty Fresh', 'Refreshing mint flavor', 100, 19.99),
    (2, 2, 'ProVape Mod', 'High-end vape mod for experienced users', 50, 99.99),
    (2, 3, 'Coil Replacements', 'Pack of 5 coil replacements', 200, 9.99);

-- Insert dummy data into Promotion table
INSERT INTO promotion (voucher_code, value_discount, description)
VALUES 
    ('SUMMER2024', 10.00, 'Summer discount for all items'),
    ('WELCOME10', 5.00, 'Welcome discount for new users');

-- Insert dummy data into Transactions table
INSERT INTO transactions (user_id, promotion_id, transaction_number, total_price_all_before, total_price_all_after, transaction_status)
VALUES 
    (1, 1, 'TXN001', 129.97, 119.97, 'Completed'),
    (3, 2, 'TXN002', 19.99, 14.99, 'Completed');

-- Insert dummy data into TransactionDetails table
INSERT INTO transaction_details (transaction_id, product_id, quantity, price, total_price_item)
VALUES 
    (1, 2, 1, 99.99, 99.99),
    (1, 1, 1, 19.99, 19.99),
    (1, 3, 1, 9.99, 9.99),
    (2, 1, 1, 19.99, 19.99);

