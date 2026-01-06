 require("dotenv").config();
const express = require("express");

const authRoute = require("./src/routes/auth.routes");
const categoryRoutes = require("./src/routes/category.routes");
const connectDB = require("./src/config/db");
const errorMiddleware = require("./src/middlewares/error-middleware");

const app = express();

app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoutes);

//test route
app.get("/test", (req, res) => {
  res.status(200).send("Welcome to Test Page");
});

//Error handler (must be after routes)
app.use(errorMiddleware)

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

