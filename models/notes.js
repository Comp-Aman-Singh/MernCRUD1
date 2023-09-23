// note.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  createDate: Date,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
