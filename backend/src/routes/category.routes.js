const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { categorySchema } = require("../validators/category.schema");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

// Protect All category routes
router.use(authMiddleware);

// Create category
router.post("/", validate(categorySchema), createCategory);

// Get all categories
router.get("/", getAllCategories);

// Get single category
router.get("/:id", getCategoryById);

// Update category
router.put("/:id", validate(categorySchema), updateCategory);

// Soft delete category
router.delete("/:id", deleteCategory);

module.exports = router;
