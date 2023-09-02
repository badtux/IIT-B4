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
           if(err) { console.log(err);}
           else{
            rows.forEach((row) => {
                console.log(row);

            });
        }
        });
//-------------------Delete-----------------------------------------------------------
//------------------------------------------------------------------------------------
        // myExpenses.run(`DELETE FROM expenses WHERE id= $id`,{$id : 13}, (err) => {
        //     console.log(err);
        // });

       myExpenses.run(`DELETE FROM expenses WHERE whom = $person AND amount > $amount`,{$person :'Samudra', $amount : 3000 }, (err) => {
            console.log(this);
        });

        myExpenses.run(`UPDATE expenses SET type = $newType, amount = $newAmount WHERE  id = $id`,{
        $newType : 'ACCOMODATION', $newAmount : 8500, $id: 4 }, (err) =>{

        });

        //myExpenses.close();