const Category = require("../models/Category-model");

// create category
const createCategory = async (req, res, next) => {
  try {
    const { name, image, status } = req.body;

    // Check duplicate category
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return next({
        status: 409,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      image,
      status,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// get all categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// get single category(for edit)
const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next({
        status: 404,
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// update category
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next({
        status: 404,
        message: "Category not found",
      });
    }

    Object.assign(category, req.body);
    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// delete(soft) category
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next({
        status: 404,
        message: "Category not found",
      });
    }

    category.status = "inactive";
    await category.save();

    res.status(200).json({
      message: "Category deactivated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
