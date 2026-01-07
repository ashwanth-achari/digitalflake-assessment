const Category = require("../models/Category-model");
const uploadToCloudinary = require("../utils/cloudinary-upload");
const isValidObjectId = require("../utils/isValidObjectId");

const createCategory = async (req, res, next) => {
  try {
    const { name, status } = req.body;

    // image validation
    if (!req.file) {
      return next({
        status: 400,
        message: "Category image is required",
      });
    }

    // duplicate name check
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return next({
        status: 409,
        message: "Category already exists",
      });
    }

    // upload image to cloudinary
    const uploadedImage = await uploadToCloudinary(
      req.file.buffer,
      "categories"
    );

    const category = await Category.create({
      name,
      image: uploadedImage.secure_url,
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

//get all categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

//get single category
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params.id);

    if (!isValidObjectId(id)) {
      return next({
        status: 400,
        message: "Invalid category ID",
      });
    }

    const category = await Category.findById(id);

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


//update category
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next({
        status: 400,
        message: "Invalid category ID",
      });
    }

    const category = await Category.findById(id);
    if (!category) {
      return next({
        status: 404,
        message: "Category not found",
      });
    }

    // if image updated
    if (req.file) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "categories"
      );
      category.image = uploadedImage.secure_url;
    }

    // update other fields
    if (req.body.name) category.name = req.body.name;
    if (req.body.status) category.status = req.body.status;

    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

//soft delete category
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return next({
        status: 400,
        message: "Invalid category ID",
      });
    }

    const category = await Category.findById(id);
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
