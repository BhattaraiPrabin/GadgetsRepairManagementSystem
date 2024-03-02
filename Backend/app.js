const express = require("express"); //Express variable
const app = express(); // Call the express Function && retrun valur in App
const cors = require('cors');
app.use(cors());

require("./models/index");
const middleware = require("./middleware/index.js");
const router = require("./router/index.js");
const file = require("express-fileupload");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "templates/views");


app.use(express.json());
app.use(file({ useTempFiles: true }));
app.use("/", router);

app.get("/", (req, res, next) => {
  res.render("index");
});
app.get("/signup", (req, res, next) => {
  // '/' is home route
  res.render("signup");
});
app.get("/login", (req, res, next) => {
  res.render("login");
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

// const userRouter = require("./controllers/user");
// const userlogin = require("./controllers/login.js");
// const staffRouter = require("./controllers/staff1.js");

// app.use("/api/user", userRouter);
// app.use("/api/login", userlogin);
