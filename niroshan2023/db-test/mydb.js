const sqlite3 = require('sqlite3');
const mydb = new sqlite3.Database('chat.sqlite3');
const myexpenses = new sqlite3.Database('express.sqlite3');

// Create the "expenses" table in mydb database
mydb.run('CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, type TEXT, amount REAL, whom TEXT)', (err) => {
  if (err) {
    console.error('Error creating table in mydb database:', err.message);
  } else {
    console.log('Table created in mydb database.');

    // Create the "expenses" table in myexpenses database
    myexpenses.run('CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, type TEXT, amount REAL, whom TEXT)', (err) => {
      if (err) {
        console.error('Error creating table in myexpenses database:', err.message);
      } else {
        console.log('Table created in myexpenses database.');

        // Now, you can insert data into the "expenses" table in myexpenses database
        myexpenses.run('INSERT INTO expenses (type, amount, whom) VALUES (?, ?, ?)', 'FOOD', 125.65, 'John', (err) => {
          if (err) {
            console.error('Error inserting data into expenses:', err.message);
          } else {
            console.log('Data inserted into expenses.');

            // Retrieve data from the "expenses" table in myexpenses database
            myexpenses.all('SELECT type, amount, whom FROM expenses', (err, rows) => {
              if (err) {
                console.error('Error retrieving data from expenses:', err.message);
              } else {
                // Loop through the rows and log each row
                rows.forEach((row) => {
                  console.log('Type:', row.type);
                  console.log('Amount:', row.amount);
                  console.log('Whom:', row.whom);
                  console.log('---'); // Separate each row with dashes
                });
              }
            });

            // Delete a record from the "expenses" table in myexpenses database by ID
            const expenseIdToDelete = 1; // Replace with the actual ID you want to delete

            myexpenses.run('DELETE FROM expenses WHERE rowid = $id', { $id: expenseIdToDelete }, (err) => {
              if (err) {
                console.error('Error deleting data from expenses:', err.message);
              } else {
                console.log('Data deleted from expenses.');
              }
            });
          }
        });
      }
    });
  }
});
// Update a record in the "expenses" table in myexpenses database by ID
const expenseIdToUpdate = 4; // Replace with the actual ID you want to update
const updatedType = 'ENTERTAINMENT';
const updatedAmount = 75.50;
const updatedWhom = 'Alice';

myexpenses.run(
  'UPDATE expenses SET type = ?, amount = ?, whom = ? WHERE rowid = ?',
  [updatedType, updatedAmount, updatedWhom, expenseIdToUpdate],
  (err) => {
    if (err) {
      console.error('Error updating data in expenses:', err.message);
    } else {
      console.log('Data updated in expenses.');
    }
  }
);
