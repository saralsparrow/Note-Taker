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
  // Read notes from db.json file and send as response
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.get('/notes', (req, res) => {

  res.sendFile(path.join(__dirname, './public/notes.html'));
});


//POST 
///api/notes receives a new note to save on the request body and add it to db.json, then returns new note to the client.
app.post('/api/notes', (req, res) => {
  //grabs notes from body of request
  const newNote = req.body

  //adds the note object to the array
  db.push(newNote)

  //update the json file with the new object
  fs.writeFileSync('./db/db.json', JSON.stringify(db))

  //responds with the note object used
  res.json(db)
})


// app.delete('/api/notes/:id', (req, res) => {
//   // const id = req.params.id;

//   // Find the index of the note with the given id in the db array
//   const index = db.findIndex(req);

//   // If note is found, remove it from the array
//   if (index !== -1) {
//     db.splice(index, 1);
//     // Update the json file with the modified array
//     fs.writeFileSync('./db/db.json', JSON.stringify(db));
//     res.status(200).json({ message: 'Note deleted successfully' });
//   } else {
//     res.status(404).json({ message: 'Note not found' });
//   }
// });


// Start server

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


