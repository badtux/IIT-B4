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
db.run('CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, amount REAL, whom TEXT)');

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Save expense data to the database
app.post('/saveExpense', (req, res) => {
    const { type, amount, whom } = req.body;
    
    if (!type || isNaN(amount) || !whom) {
        return res.status(400).send('Invalid data');
    }

    db.run('INSERT INTO expenses (type, amount, whom) VALUES (?, ?, ?)', [type, amount, whom], (err) => {
        if (err) {
            console.error('Error saving data:', err.message);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send('Expense saved successfully');
    });
});

// Retrieve expense data from the database
app.get('/getExpenses', (req, res) => {
    db.all('SELECT * FROM expenses', (err, rows) => {
        if (err) {
            console.error('Error retrieving data:', err.message);
            return res.status(500).send('Internal server error');
        }
        res.status(200).json(rows);
    });
});

// Delete expense by ID
app.delete('/deleteExpense/:id', (req, res) => {
    const expenseId = req.params.id;
    
    db.run('DELETE FROM expenses WHERE id = ?', expenseId, (err) => {
        if (err) {
            console.error('Error deleting data:', err.message);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send('Expense deleted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
