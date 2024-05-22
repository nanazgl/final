const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3002;
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
    user: 'nanazgl',
    host: 'localhost',
    database: 'flashcard',
    password: '1111',
    port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to PostgreSQL', err);
    } else {
        console.log('Connected to PostgreSQL:', res.rows[0].now);
    }
});

app.get('/languages', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM languages');
        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving languages', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/themes/:language', async (req, res) => {
    const languageName = req.params.language;

    try {
        const languageResult = await pool.query('SELECT id FROM languages WHERE name = $1', [languageName]);

        if (languageResult.rows.length === 0) {
            console.error('Language not found:', languageName);
            return res.status(404).send('Language not found');
        }

        const languageId = languageResult.rows[0].id;
        const themesResult = await pool.query('SELECT * FROM themes WHERE language_id = $1', [languageId]);

        res.json(themesResult.rows);
    } catch (error) {
        console.error('Error retrieving themes by language', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/words/:language/:theme', async (req, res) => {
    const languageName = req.params.language;
    const themeName = req.params.theme;

    try {
        const languageResult = await pool.query('SELECT id FROM languages WHERE name = $1', [languageName]);
        const languageId = languageResult.rows[0].id;
        const themeResult = await pool.query(`
            SELECT id FROM themes WHERE name = $1 AND language_id = $2
        `, [themeName, languageId]);

        const themeId = themeResult.rows[0].id;

        const wordsResult = await pool.query(`
            SELECT id, question, answer FROM flashcards WHERE theme_id = $1
        `, [themeId]);

        res.json(wordsResult.rows);
    } catch (error) {
        console.error('Error retrieving words by language and theme', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
