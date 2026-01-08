const express = require("express");
const router = express.Router();

const subCategoryController = require("../controllers/subCategory.controller");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
const upload = require("../middlewares/upload-middleware");

const {
  createSubCategorySchema,
} = require("../validators/subCategory.create.schema");
const {
  updateSubCategorySchema,
} = require("../validators/subCategory.update.schema");

// protect routes
router.use(authMiddleware);

// create
router.post(
  "/",
  upload.single("image"),
  validate(createSubCategorySchema),
  subCategoryController.createSubCategory
);

// get all
router.get("/", subCategoryController.getAllSubCategories);

// get one
router.get("/:id", subCategoryController.getSubCategoryById);

// update
router.put(
  "/:id",
  upload.single("image"),
  validate(updateSubCategorySchema),
  subCategoryController.updateSubCategory
);

// delete
router.delete("/:id", subCategoryController.deleteSubCategory);

module.exports = router;
