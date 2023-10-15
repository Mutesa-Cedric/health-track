import sqlite3 = require('sqlite3')

const db = new sqlite3.Database(':memory:')
db.serialize(() => {
    // patients and records tables
    db.run(`
        CREATE TABLE patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            national_id TEXT NOT NULL,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        )
    `)
    db.run(`
        CREATE TABLE records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER NOT NULL,
            body_temperature REAL NOT NULL,
            heart_rate INTEGER NOT NULL,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL,
            FOREIGN KEY (patient_id) REFERENCES patients(id)
        )
    `)
})

export default db