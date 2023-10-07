const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = new sqlite3.Database('user.sqlite3');

// Create the "user" table if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS user (name TEXT, email TEXT, message TEXT)');

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Save user data to the database
app.post('/saveuser', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || isNaN(email) || !message) {
        return res.status(400).send('Invalid data');
    }

    db.run('INSERT INTO user (name, email, message) VALUES (?, ?, ?)', [name, email, message], (err) => {
        if (err) {
            console.error('Error saving data:', err.message);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send('user saved successfully');
    });
});

// Retrieve user data from the database
app.get('/getuser', (req, res) => {
    db.all('SELECT * FROM user', (err, rows) => {
        if (err) {
            console.error('Error retrieving data:', err.message);
            return res.status(500).send('Internal server error');
        }
        res.status(200).json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
