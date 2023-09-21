//Import expresss
const express = require("express");
const connectToDb = require("./config/connectToDb");
const Note = require("./models/note.js");

//calling env variable
require("dotenv").config();

//connecting DB
connectToDb();

//creating the express app
const app = express();

//Routing in the app
app.get("/", (req, res) => {
  res.json({ hello: "hel" });
});

//configure Express
app.use(express.json());

app.post("/notes", async (req, res) => {
  console.log("notes");
  // get the sent in data off request body

  const title = req.body.title;
  const body = req.body.body;
  try {
    const note = await Note.create({
      title: title,
      body: body,
    });
    res.json({ note: note });
    console.log("The request has been sent ");
  } catch (err) {
    console.log("Internal server error", err);
  }
});

//starting the sever
app.listen(process.env.PORT);
