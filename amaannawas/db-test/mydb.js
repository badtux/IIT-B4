const sqlite3 = require('sqlite3');
const myDb = new sqlite3.Database('chat.sqlite3');
const myExpences = new sqlite3.Database('expences.sqlite3');

myExpences.run(`CREATE TABLE IF NOT EXISTS expences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    type TEXT,
    amount REAL,
    whom TEXT)`);

    // myExpences.run(`INSERT INTO expences (type, amount, whom)
    //                     VALUES (?,?,?)`, 'FOOD', 15160.50, 'John');

    myExpences.all(`SELECT type, amount, whom FROM expences`, (err, rows) => {
        if (err) { console.log(err); }
        else {

            rows.forEach((row) => {
                console.log(row);
            });
        }
    });

    myExpences.run(`DELETE FROM expences WHERE id = $id`, {$id : 1}, (err) => {
        console.log(this);
    })

    myExpences.run('UPDATe expences SET type = $newType, amount = $newAmount WHERE id = $id', {
            $newType : 'ACCOMODATION', 
            $newAmount : 85000, 
            $id : 9 
        
        }, (err) => {
            console.log(err);
        
    })

    myExpences.close();