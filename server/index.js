const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3001;

// --- Database Connection ---
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// --- Function to Create Tables ---
const createTables = async () => {
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );`;

    const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        image_url TEXT,
        user_id INTEGER REFERENCES users(id)
    );`;

    try {
        await pool.query(createUsersTable);
        console.log("Successfully ensured 'users' table exists.");
        await pool.query(createProductsTable);
        console.log("Successfully ensured 'products' table exists.");
    } catch (err) {
        console.error("Error creating tables:", err);
    }
};

// Middleware to parse JSON bodies
app.use(express.json());

// --- API Endpoints (Updated for PostgreSQL) ---

// POST /api/register
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashedPassword]
        );
        res.status(201).json({ message: 'User registered successfully!', userId: result.rows[0].id });
    } catch (err) {
        if (err.code === '23505') { // Unique violation
            return res.status(400).json({ error: 'Username or email already exists.' });
        }
        res.status(500).json({ error: 'Failed to register user.' });
    }
});

// POST /api/login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        res.status(200).json({
            message: 'Login successful!',
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error during login.' });
    }
});

// --- PRODUCT ENDPOINTS ---

// GET /api/products - Get all product listings
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products.' });
    }
});

// POST /api/products - Create a new product listing
app.post('/api/products', async (req, res) => {
    const { title, description, category, price, image_url, user_id } = req.body;
    if (!title || !category || !price || !user_id) {
        return res.status(400).json({ error: 'Please provide title, category, price, and user_id.' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO products (title, description, category, price, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [title, description, category, price, image_url, user_id]
        );
        res.status(201).json({
            message: 'Product listed successfully!',
            productId: result.rows[0].id
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to create product listing.' });
    }
});

// GET /api/products/:id - Get a single product by ID --- NEWLY ADDED ---
app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameter
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        const product = result.rows[0];

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch product.' });
    }
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    createTables(); // Create tables when the server starts
});