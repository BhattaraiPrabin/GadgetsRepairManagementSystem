//connection MONGOOSE
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/gadgets")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error occured while connecting to DB.", error);
  });
  // autoIncrement.initialize(connection);
