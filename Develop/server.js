const fs = require('fs');
const path = require('path');

// Import express package
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db/db.json');

app.use(express.static('public'));

app.use(express.json());

// Routes

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        ///error logging
        if (err) throw err;
        let dbData = JSON.parse(data);
        //Returns new database
        res.json(dbData)
    });   
})

// Start server

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
