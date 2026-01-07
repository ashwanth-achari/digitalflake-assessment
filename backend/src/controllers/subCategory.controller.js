const SubCategory = require("../models/SubCategory-model");
const Category = require("../models/Category-model");

// CREATE SUBCATEGORY
const createSubCategory = async (req, res, next) => {
  try {
    const { name, image, categoryId, status } = req.body;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return next({
        status: 404,
        message: "Category not found",
      });
    }

    // Prevent duplicate subcategory in same category
    const existingSubCategory = await SubCategory.findOne({
      name,
      categoryId,
    });

    if (existingSubCategory) {
      return next({
        status: 409,
        message: "Subcategory already exists in this category",
      });
    }

    const subCategory = await SubCategory.create({
      name,
      image,
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

// GET ALL SUBCATEGORIES
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

// GET SINGLE SUBCATEGORY
const getSubCategoryById = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).populate(
      "categoryId",
      "name"
    );

    if (!subCategory) {
      return next({
        status: 404,
        message: "Subcategory not found",
      });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    next(error);
  }
};

// UPDATE SUBCATEGORY
const updateSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return next({
        status: 404,
        message: "Subcategory not found",
      });
    }

    Object.assign(subCategory, req.body);
    await subCategory.save();

    res.status(200).json({
      message: "Subcategory updated successfully",
      subCategory,
    });
  } catch (error) {
    next(error);
  }
};

// SOFT DELETE SUBCATEGORY
const deleteSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return next({
        status: 404,
        message: "Subcategory not found",
      });
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
