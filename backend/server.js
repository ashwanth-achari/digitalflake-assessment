 require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoute = require("./src/routes/auth.routes");
const categoryRoutes = require("./src/routes/category.routes");
const subCategoryRoutes = require("./src/routes/subcategory.routes");
const connectDB = require("./src/config/db");
const errorMiddleware = require("./src/middlewares/error-middleware");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://devash-services.vercel.app",
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);

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

