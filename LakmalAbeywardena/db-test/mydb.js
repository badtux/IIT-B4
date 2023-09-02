const sqlite3 = require('sqlite3');
const myDb = new sqlite3.Database('chat.sqlite3');
const myExpenses = new sqlite3.Database('expnss.sqlite3');


//myExpenses.run('CREATE TABLE expenses (date,type,amount,whom)');

myExpenses.run(`CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        type TEXT,
        amount REAL,
        whom Text)`);

        myExpenses.run('INSERT INTO expenses (type, amount, whom) VALUES (?,?,?)','Travel', 1250.65, 'Samudra');

        myExpenses.all(`SELECT type, amount, whom FROM expenses`, (err, rows) => {
            rows.forEach((row) => {
                console.log(row);

            });
        });