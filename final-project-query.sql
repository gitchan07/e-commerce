-- Create the database
CREATE DATABASE vapestore;

-- Use the newly created database
USE vapestore;

-- Create Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(100),
    address VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Category table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Promotion table (moved here before transactions)
CREATE TABLE promotion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    voucher_code VARCHAR(50) NOT NULL,
    value_discount DECIMAL(10, 2),
    description VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Products table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    category_id INT,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    stock INT,
    price DECIMAL(10, 2),
    promotion DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Create Transactions table (after promotion table)
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    promotion_id INT,
    datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_number VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    total_price_all DECIMAL(10, 2) DEFAULT 0.00,
    transaction_status VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (promotion_id) REFERENCES promotion(id)
);

-- Create TransactionDetails table
CREATE TABLE transaction_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    total_price_item DECIMAL(10, 2),
    FOREIGN KEY (transaction_id) REFERENCES transactions(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Change the delimiter to //
DELIMITER //

-- Trigger to calculate total_price_item in transaction_details
CREATE TRIGGER calculate_total_price_item
BEFORE INSERT ON transaction_details
FOR EACH ROW
BEGIN
    SET NEW.total_price_item = NEW.quantity * NEW.price;
END;
//

-- Trigger to update total_price_item in transaction_details on update
CREATE TRIGGER calculate_total_price_item_update
BEFORE UPDATE ON transaction_details
FOR EACH ROW
BEGIN
    SET NEW.total_price_item = NEW.quantity * NEW.price;
END;
//

-- Trigger to update total_price_all in transactions after insert
CREATE TRIGGER update_transaction_total_price_all
AFTER INSERT ON transaction_details
FOR EACH ROW
BEGIN
    UPDATE transactions
    SET total_price_all = (SELECT SUM(total_price_item) FROM transaction_details WHERE transaction_id = NEW.transaction_id)
    WHERE id = NEW.transaction_id;
END;
//

-- Trigger to update total_price_all in transactions after update
CREATE TRIGGER update_transaction_total_price_all_on_update
AFTER UPDATE ON transaction_details
FOR EACH ROW
BEGIN
    UPDATE transactions
    SET total_price_all = (SELECT SUM(total_price_item) FROM transaction_details WHERE transaction_id = NEW.transaction_id)
    WHERE id = NEW.transaction_id;
END;
//

-- Change the delimiter back to the default semicolon
DELIMITER ;
