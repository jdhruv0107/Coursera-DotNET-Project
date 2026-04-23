const express = require("express");
const usersRouter = require("./routes/users");
const requestLogger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.json({ message: "User Management API is running" });
});

app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).json({
    error: "Internal Server Error",
    details: err.message
  });
});

module.exports = app;
