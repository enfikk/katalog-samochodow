require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware do parsowania JSON z requestów
app.use(express.json());

app.use(express.static('.'));

// Połączenie z bazą danych PostgreSQL w Dockerze
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// TEST POŁĄCZENIA Z BAZĄ
pool.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err.stack);
    } else {
        console.log('Połączono z bazą PostgreSQL w Dockerze! 🚀');
    }
});

// 1. GET /api/cars - Pobieranie wszystkich samochodów
app.get('/api/cars', async (req, res) => {
    try {
        const query = `
      SELECT 
        c.id, 
        b.name AS brand, 
        c.model, 
        c.year, 
        c.mileage, 
        c.vin, 
        c.is_accident_free
      FROM cars c
      JOIN brands b ON c.brand_id = b.id
      ORDER BY c.id DESC;
    `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Błąd podczas pobierania aut' });
    }
});

// 2. POST /api/cars - Dodawanie nowego samochodu
app.post('/api/cars', async (req, res) => {
    const { brand_id, model, year, mileage, vin, is_accident_free } = req.body;

    try {
        const query = `
      INSERT INTO cars (brand_id, model, year, mileage, vin, is_accident_free)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
        const values = [brand_id, model, year, mileage, vin, is_accident_free];
        const result = await pool.query(query);

        res.status(201).json({ message: 'Dodano auto!', car: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Błąd podczas dodawania auta' });
    }
});

// Start serwera
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});