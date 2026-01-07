const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");
const { createCategorySchema } = require("../validators/category.create.schema");
const { updateCategorySchema } = require("../validators/category.update.schema");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
const upload = require("../middlewares/upload-middleware");

// protect all routes
router.use(authMiddleware);

// create category
router.post(
  "/",
  upload.single("image"),
  validate(createCategorySchema),
  categoryController.createCategory
);

// get all
router.get("/", categoryController.getAllCategories);

// get one
router.get("/:id", categoryController.getCategoryById);

// update
router.put(
  "/:id",
  upload.single("image"),
  validate(updateCategorySchema),
  categoryController.updateCategory
);

// soft delete
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
