const Note = require("../models/notes");

//---------------------------------------------------------------------------

const addData = async (req, res) => {
  // Get the sent-in data from the request body
  const { title, body, createDate } = req.body;

  try {
    // Create a new Note document with the current date
    const currentDate = new Date();
    const note = await Note.create({
      title: title,
      body: body,
      createDate: currentDate,
    });

    res.json({ note: note });
    console.log("The request has been sent ");
  } catch (err) {
    console.log("Internal server error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//---------------------------------------------------------------------------
const fetchAll = async (req, res) => {
  //finding the notes
  const notes = await Note.find();
  //respnd with the notes
  res.json({ notes });
};

//---------------------------------------------------------------------------

const fetchSingle = async (req, res) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId);
  res.json({ note: note });
  console.log(" Data got Fetched By the Id ");
};

//----------------------------------------------------------------------------

const deleteData = async (req, res) => {
  // Get the Id
  const noteId = req.params.id;

  //delete with the use of id
  await Note.deleteOne({ id: noteId });

  //response with the success method
  res.json({ success: "Success" });
};

//----------------------------------------------------------------------------

const updateData = async (req, res) => {
  try {
    // Get the ID from the request parameters
    const noteId = req.params.id;
    console.log("got the id ");

    // Get the data from the request body
    const title = req.body.title;
    const body = req.body.body;

    console.log("Got the updated data");
    // Find and update the Note by its ID
    const updatedNote = await Note.findByIdAndUpdate(noteId, {
      title: title,
      body: body,
    });
    console.log("updated the data");

    // Check if the note was found and updated
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Find the updated data
    const notes = await Note.findById(noteId);

    res.json({ notes: notes });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  addData,
  fetchSingle,
  fetchAll,
  deleteData,
  updateData,
};
