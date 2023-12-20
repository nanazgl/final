const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3002;
app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json());

const pool = new Pool({
    user: 'nanazgl',
    host: 'localhost',
    database: 'flashcard',
    password: '1111',
    port: 5432,
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to PostgreSQL', err);
    } else {
        console.log('Connected to PostgreSQL:', res.rows[0].now);
    }
});


app.get('/flashcards', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM flashcards');
        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving flashcards', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/flashcards/:theme', async (req, res) => {
    const theme = req.params.theme;
    try {
        const result = await pool.query(`
        SELECT flashcards.id, flashcards.question, flashcards.answer
        FROM flashcards
        JOIN themes ON themes.id = flashcards.theme_id
        WHERE themes.name = $1
    `, [theme]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving flashcards by theme', error);
        res.status(500).send('Internal Server Error');
    }
    console.log('Theme:', theme);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
