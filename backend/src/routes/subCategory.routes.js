const express = require("express");
const router = express.Router();

const subCategoryController = require("../controllers/subCategory.controller");
const { subCategorySchema } = require("../validators/subCategory.schema");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

// Protect all routes
router.use(authMiddleware);

// Create subcategory
router.post(
  "/",
  validate(subCategorySchema),
  subCategoryController.createSubCategory
);

// Get all subcategories
router.get("/", subCategoryController.getAllSubCategories);

// Get single subcategory
router.get("/:id", subCategoryController.getSubCategoryById);

// Update subcategory
router.put(
  "/:id",
  validate(subCategorySchema),
  subCategoryController.updateSubCategory
);

// Soft delete subcategory
router.delete("/:id", subCategoryController.deleteSubCategory);

module.exports = router;
