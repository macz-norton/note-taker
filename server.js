const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use(express.static("public"));

// API routes

app.get("/api/notes", function(req, res) {

    fs.readFile("db.json", (err, data) => {
        if (err) throw (err);
        console.log(data);
    })

    JSON.parse(data);
    
    return res.json(notes);

});

app.post("/api/notes", function(req, res) {

    
});

app.delete("/api/notes/:id", function(req, res) {

    
});

// HTML routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});