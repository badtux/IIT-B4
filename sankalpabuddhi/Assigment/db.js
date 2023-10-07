const mysql = require('mysql');
const someModule = require('./someModule');
// Create a database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'user',
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Function to insert a new expense record
function insertuser(name, email, message) {
  const sql = 'INSERT INTO user (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) throw err;
    console.log('user record inserted');
  });
}

// Function to retrieve user records
function getuser(callback) {
  const sql = 'SELECT * FROM user';
  db.query(sql, (err, results) => {
    if (err) throw err;
    callback(results);
  });
}

module.exports = { insertuser, getuser };
