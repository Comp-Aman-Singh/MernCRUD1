//calling env variable
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//Import expresss
const express = require("express");
const connectToDb = require("./config/connectToDb");


//connecting DB

//creating the express app
const app = express();
connectToDb();

//Routing in the app

app.get("/", (req, res) => {
  res.json({ hello: "hel" });
});

//starting the sever
app.listen(process.env.PORT);
