/** Express app for jobly. */

const express = require("express");
const ExpressError = require("./helpers/expressError");
const morgan = require("morgan");
// route imports
const companiesRoutes = require("./routes/companies");
const jobsRoutes = require("./routes/jobs");
const userRoutes = require("./routes/users");
const login = require("./routes/login");

const app = express();

app.use(express.json());

// add logging system
app.use(morgan("tiny"));

// routes 
app.use("/companies", companiesRoutes);
app.use("/jobs", jobsRoutes);
app.use("/users", userRoutes);
app.use("/login", login);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
