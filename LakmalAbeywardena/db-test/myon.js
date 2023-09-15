const sqlite3 = require('sqlite3');
const express = require('express');
const myDb = new sqlite3.Database('chat.sqlite3');
const myExpenses = new sqlite3.Database('expnss.sqlite3');

const port = 3000;
const app = express();

app.use(express.static('public'));

myExpenses.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT, 
    type TEXT,
    amount REAL,
    whom TEXT)`);

// myExpenses.run(`INSERT INTO expenses (type, amount, whom) 
//                     VALUES (?,?,?)`, 'TRAVEL',  1250, 'Samudra');

// myExpenses.all(`SELECT id, type, amount, whom FROM expenses`, (err, rows) => {
//     if (err) { console.log(err); }
//     else { 
//         rows.forEach((row) => {
//             console.log(row);
//         });
//     }
// });

// myExpenses.run(`DELETE FROM expenses WHERE whom = $person AND amount < $amount`, {$person: 'Samudra', $amount : 3000}, (err) => {
//     console.log(this);
// });

// myExpenses.run(`UPDATE expenses SET type = $newType, amount = $newAmount 
//                     WHERE id = $id`, {
//         $newType : 'ACCOMODATION', 
//         $newAmount: 85000, 
//         $id: 17 
//     }, (err) => {
//         console.log(err);
// });

app.post('/add-exp', (req, res) => {

});

app.get('/expenses', (req, res) => {
    console.log('someone is asking for the page..');
    console.log('you are in '+__dirname);
    res.status(200).sendFile(__dirname+'/public/myexpenses.html');
});

// myExpenses.close();
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});