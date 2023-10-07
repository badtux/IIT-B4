// In server.js
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS user (
        name TEXT,
        email TEXT,
        message TEXT
    )`);
});
