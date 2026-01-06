 require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");
const authRoute = require("./src/routes/auth.routes");

const app = express();

app.get("/test", (req, res) => {
  res.status(200).send("Welcome to Test Page");
});

const PORT = process.env.PORT || 4000;

//DB connection + server starting
connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
  });
})
.catch((err) => {
  console.error("Failed to connnect to database:",err);
});

