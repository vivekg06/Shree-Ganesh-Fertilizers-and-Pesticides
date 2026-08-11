-- Run this in phpMyAdmin > Select "fertilizer_shop" database > SQL tab

CREATE TABLE IF NOT EXISTS orders (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL,
    phone       VARCHAR(20)   NOT NULL,
    product     TEXT          NOT NULL,
    quantity    VARCHAR(50)   NOT NULL,
    order_date  DATETIME      NOT NULL
);

CREATE TABLE if not exists users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20),
    created_at DATETIME NOT NULL
);

CREATE TABLE if not exists cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL
);