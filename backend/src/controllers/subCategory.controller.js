const SubCategory = require("../models/SubCategory-model");
const Category = require("../models/Category-model");
const uploadToCloudinary = require("../utils/cloudinary-upload");
const isValidObjectId = require("../utils/isValidObjectId");

// CREATE
const createSubCategory = async (req, res, next) => {
  try {
    const { name, categoryId, status } = req.body;

    // image required
    if (!req.file) {
      return next({
        status: 400,
        message: "Subcategory image is required",
      });
    }

    if (!isValidObjectId(categoryId)) {
      return next({ status: 400, message: "Invalid category ID" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return next({ status: 404, message: "Category not found" });
    }

    const exists = await SubCategory.findOne({ name, categoryId });
    if (exists) {
      return next({
        status: 409,
        message: "Subcategory already exists in this category",
      });
    }

    const uploadedImage = await uploadToCloudinary(
      req.file.buffer,
      "subcategories"
    );

    const subCategory = await SubCategory.create({
      name,
      image: uploadedImage.secure_url,
      categoryId,
      status,
    });

    res.status(201).json({
      message: "Subcategory created successfully",
      subCategory,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL
const getAllSubCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.find()
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: subCategories.length,
      subCategories,
    });
  } catch (error) {
    next(error);
  }
};

// GET ONE
const getSubCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next({ status: 400, message: "Invalid subcategory ID" });
    }

    const subCategory = await SubCategory.findById(id).populate(
      "categoryId",
      "name"
    );

    if (!subCategory) {
      return next({ status: 404, message: "Subcategory not found" });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, categoryId, status } = req.body;

    if (!isValidObjectId(id)) {
      return next({ status: 400, message: "Invalid subcategory ID" });
    }

    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      return next({ status: 404, message: "Subcategory not found" });
    }

    // image optional
    if (req.file) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "subcategories"
      );
      subCategory.image = uploadedImage.secure_url;
    }

    if (categoryId) {
      if (!isValidObjectId(categoryId)) {
        return next({ status: 400, message: "Invalid category ID" });
      }

      const category = await Category.findById(categoryId);
      if (!category) {
        return next({ status: 404, message: "Category not found" });
      }

      subCategory.categoryId = categoryId;
    }

    if (name) subCategory.name = name;
    if (status) subCategory.status = status;

    await subCategory.save();

    res.status(200).json({
      message: "Subcategory updated successfully",
      subCategory,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE (SOFT)
const deleteSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next({ status: 400, message: "Invalid subcategory ID" });
    }

    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      return next({ status: 404, message: "Subcategory not found" });
    }

    subCategory.status = "inactive";
    await subCategory.save();

    res.status(200).json({
      message: "Subcategory deactivated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
