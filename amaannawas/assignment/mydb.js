const sqlite3 = require('sqlite3');
const express = require('express');
const myDb = new sqlite3.Database('chat.sqlite3');
const myContacts = new sqlite3.Database('contacts.sqlite3');

const port = 3000;
const app = express();

app.use(express.static('public'));

let addForm = document.getElementById('addForm');
// let name = document.getElementById('name');
// let email = document.getElementById('email');
// let message = document.getElementById('message');
// const date = new Date();

addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    myContacts.run(`CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        email TEXT,
        time TEXT 
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table "contacts" created successfully.');
        }
    });

    app.post('/addContact', (req, res) => {
        const { name, email, message } = req.body;
        const date = new Date().toISOString();
      
        myContacts.run(
          'INSERT INTO contacts (name, email, message, time) VALUES (?, ?, ?, ?)',
          [name, email, message, date],
          (err) => {
            if (err) {
              console.error('Error inserting into contacts:', err.message);
              res.status(500).send('Internal Server Error');
            } else {
              console.log('Contact added successfully');
              res.status(200).send('Contact added successfully');
            }
          }
        );
      });

    //     myContacts.run(`INSERT INTO contacts (name, email, time) 
    //                 VALUES (?,?,?)`, name,  email, date);
});


// myContacts.all(`SELECT id, type, amount, whom FROM contacts`, (err, rows) => {
//     if (err) { console.log(err); }
//     else { 
//         rows.forEach((row) => {
//             console.log(row);
//         });
//     }
// });

// myContacts.run(`DELETE FROM contacts WHERE whom = $person AND amount < $amount`, {$person: 'Samudra', $amount : 3000}, (err) => {
//     console.log(this);
// });

// myContacts.run(`UPDATE contacts SET type = $newType, amount = $newAmount 
//                     WHERE id = $id`, {
//         $newType : 'ACCOMODATION', 
//         $newAmount: 85000, 
//         $id: 17 
//     }, (err) => {
//         console.log(err);
// });

app.post('/add-exp', (req, res) => {

});

app.get('/contacts', (req, res) => {
    console.log('someone is asking for the page..');
    console.log('you are in '+__dirname);
    res.status(200).sendFile(__dirname+'/pages/myContacts.html');
});

// myContacts.close();
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});