const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const app = express();
const port = process.env.PORT || 3000;

// Initialize SQLite database
const db = new sqlite3.Database('database.sqlite');

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.get('/getExpenses', (req, res) => {
    db.all('SELECT * FROM expenses', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(rows);
    });
});

app.post('/saveExpense', (req, res) => {
    const { type, amount, whom } = req.body;
    if (!type || isNaN(amount) || !whom) {
        res.status(400).json({ status: 'error', message: 'Invalid data' });
        return;
    }

    db.run('INSERT INTO expenses (type, amount, whom) VALUES (?, ?, ?)', [type, amount, whom], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Error saving expense' });
            return;
        }
        res.status(201).json({ status: 'success', message: 'Expense saved successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
