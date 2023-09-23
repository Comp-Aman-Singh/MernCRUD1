//Import expresss
const express = require("express");
const connectToDb = require("./config/connectToDb");
const notesControllers = require("./controllers/notesControllers");
const cors = require("cors");
//calling env variable
require("dotenv").config();

//connecting DB
connectToDb();

//creating the express app
const app = express();

//configure Express
app.use(cors());
app.use(express.json());

//------------------------Routing in the app-------------------------------

//fetching the data
app.get("/notes", notesControllers.fetchAll);

//fetching the data  by id
app.get("/notes/:id", notesControllers.fetchSingle);

//addnning the data
app.post("/notes", notesControllers.addData);

//Updating the data
app.put("/notes/:id", notesControllers.updateData);
//Deleting the data
app.delete("/notes/:id", notesControllers.deleteData);

//displayin only the data that are inserted today

//starting the sever
app.listen(process.env.PORT);
