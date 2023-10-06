const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./mock.db", sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);
    console.log("connecton successful");

});

db.run( 'CREATE TABLE users(Name, Email, Massage)');

    




db.close((err) => {
    if (err) return console.error(err.message);
});