-- 1. Tabela marek (1:N z samochodami)
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Tabela samochodów
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    brand_id INT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL CHECK (year >= 1886 AND year <= 2030),
    mileage INT NOT NULL DEFAULT 0 CHECK (mileage >= 0),
    vin VARCHAR(17) NOT NULL UNIQUE,
    is_accident_free BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Przykładowe marki
INSERT INTO brands (name) VALUES ('BMW'), ('Audi'), ('Toyota');

-- 4. Przykładowe samochody
INSERT INTO cars (brand_id, model, year, mileage, vin, is_accident_free) VALUES
(1, 'M3', 2021, 25000, 'WBANW11040DX12345', true),
(2, 'A4', 2019, 85000, 'WAUZZZ8K9FA987654', false),
(3, 'RAV4', 2022, 15000, 'JTDBR32E10D555111', true);