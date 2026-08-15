CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    brand_id INT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    mileage INT NOT NULL DEFAULT 0
);

INSERT INTO brands (name) VALUES ('BMW'), ('Audi'), ('Toyota');

INSERT INTO cars (brand_id, model, year, price, mileage) VALUES
(1, 'M3', 2021, 350000.00, 25000),
(2, 'A4', 2019, 120000.00, 85000),
(3, 'RAV4', 2022, 160000.00, 15000);