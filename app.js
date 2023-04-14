var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var schoolRouter = require("./routes/school");
var boardRouter = require("./routes/board");
var selectorRouter = require("./routes/selector");
var resourceRouter = require("./routes/resource");
var universityRouter = require("./routes/University");
var University = require("./models/University");

var app = express();

require("dotenv").config();
const connectionString = process.env.MONGO_CON;
const mongoose = require("mongoose");
mongoose.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything
  await University.deleteMany();
  let instance1 = new University({
    University_name: "Northwest",
    City: "Maryville",
    Students: 1500,
  });
  instance1
    .save()
    .then((doc) => {
      console.log("Second object saved");
    })
    .catch((err) => {
      console.log(err);
    });

  let instance2 = new University({
    University_name: "Harvard",
    City: "Massachusetts",
    Students: 700,
  });
  instance2
    .save()
    .then((doc) => {
      console.log("third object saved");
    })
    .catch((err) => {
      console.log(err);
    });

  let instance3 = new University({
    University_name: "Yale",
    City: "Connecticut",
    Students: 900,
  });
  instance3
    .save()
    .then((doc) => {
      console.log("third object saved");
    })
    .catch((err) => {
      console.log(err);
    });
}
let reseed = true;
if (reseed) {
  recreateDB();
}

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/resource/University", resourceRouter);
app.use("/users", usersRouter);
app.use("/schools", schoolRouter);
app.use("/boards", boardRouter);
app.use("/selectors", selectorRouter);
app.use("/resource", resourceRouter);
app.use("/University", resourceRouter);
//app.use('/Universities', resourceRouter);
app.use("/Universities", universityRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
