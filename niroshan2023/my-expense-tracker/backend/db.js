const mysql = require('mysql');
const someModule = require('./someModule');
// Create a database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'expense_tracker_db',
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Function to insert a new expense record
function insertExpense(type, amount, whom) {
  const sql = 'INSERT INTO expenses (type, amount, whom) VALUES (?, ?, ?)';
  db.query(sql, [type, amount, whom], (err, result) => {
    if (err) throw err;
    console.log('Expense record inserted');
  });
}

// Function to retrieve expense records
function getExpenses(callback) {
  const sql = 'SELECT * FROM expenses';
  db.query(sql, (err, results) => {
    if (err) throw err;
    callback(results);
  });
}

module.exports = { insertExpense, getExpenses };
