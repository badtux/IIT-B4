const sqlite3 = require('sqlite3');
const en = new sqlite3.Database('en.sqlite3');


en.run(`CREATE TABLE IF NOT EXISTS expenses (
id INTEGER PRIMARY KEY AUTOINCREMENT,
date TEXT,
type TEXT,
amount REAL,
whom TEXT

)`);

en.run(`INSERT INTO expenses (type, amount, whom) VALUES(?,?,?)`,`Freedom`,1250.68,`Lakmal`);
