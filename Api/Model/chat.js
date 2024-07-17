const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./DB_Notebook.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

const getAllMessages = (callback) => {
    db.all('SELECT * FROM messages ORDER BY timestamp', (err, rows) => {
        callback(err, rows);
    });
};

const saveMessage = (msg, callback) => {
    db.run('INSERT INTO messages (message) VALUES (?)', [msg], function (err) {
        callback(err, { id: this.lastID, message: msg, timestamp: new Date() });
    });
};

module.exports = {
    getAllMessages,
    saveMessage
};
