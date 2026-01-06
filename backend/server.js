const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.status(200).send("Welcome to Home Page -DEPLOY TEST");
});

const PORT = process.env.PORT || 4000;



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
