//setting up variables for the necessary dependencies 
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();


//Setting up the main database connection using an arrow function. If the arrow remains true then it should console.log the error. If false, print the conection
const db = new sqlite3.Database('./database/calculator.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the calculator database.');
});

db.run('CREATE TABLE IF NOT EXISTS calculator(id INTEGER PRIMARY KEY, operations TEXT NOT NULL, result REAL NOT NULL, time TEXT NOT NULL)');

//Seting up the Express app
// Still not familiar with this portion.. found it on Stack overflow
const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//Define the API routes.

server.get('/history', (req, res) => {
  db.all('SELECT * FROM calculator ORDER BY time DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve calculator from the database.' });
    }
    res.json(rows);
  });
});

// So the "GET" request to the /history route retrieves all calculations from the database and returns them in descending order by timestamp and the "POST" request to the /history route should insert a new calculation into the database.

server.post('/history', (req, res) => {
  const { id, operations, result, time } = req.body;
  if (!id || !operations || !result || !time) {
    return res.status(400).json({ error: 'Invalid request body.' });
  }
  db.run('INSERT INTO calculator(id, operations, result, time) VALUES(?, ?, ?, ?)', [id, operations, result, time], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to insert calculator into the database.' });
    }
    res.sendStatus(201);
  });
});

//lastly the port for the server

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000.`);
});

