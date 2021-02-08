const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid"); 

const db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use(express.static("public"));

// API routes
app.get("/api/notes", (req, res) => {

    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw (err);

        let parsedNotes = JSON.parse(data);
    
        return res.json(parsedNotes);

    });

});

app.post("/api/notes", (req, res) => {

    // Adding unique ID to each note
    req.body["id"] = uniqid();
    
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw (err);

        let parsedNotes = JSON.parse(data);

        parsedNotes.push(req.body);

        let saveNote = JSON.stringify(parsedNotes);

        fs.writeFile("./db/db.json", saveNote, (err, data) => {
            if (err) throw (err);

            return res.json(saveNote);
        });
    });
});

app.delete("/api/notes/:id", (req, res) => {

    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw (err);

        let parsedNotes = JSON.parse(data);

        parsedNotes.push(req.body);


    })
    
});

// HTML routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Server starts to listen for requests
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});