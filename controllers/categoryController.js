const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    const newCategory = req.body;
    const categoryCreated = await Category.create(newCategory);
    res.status(200).json({
      status: "success",
      message: "category created",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error,
    });
  }
};

exports.readCategoryById = (req, res) => {
  return res.json(req.category);
};

exports.updateCategory = async (req, res, next) => {
  const category = req.category;
  try {
    await Category.findByIdAndUpdate(category._id, {
      $set: {
        name: req.body.name,
      },
    });
    return res.status(200).json({
      status: "success",
      message: "Updated successfully",
    });
  } catch (error) {
    return res.status(200).json({
      status: "failed",
      message: "Failed to find category specified",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.category._id);
    return res.status(200).json({
      status: "success",
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Deletion failed",
    });
  }
};

exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      categories: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to fetch categories",
    });
  }
};

exports.categoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    if (category) {
      req.category = category;
      next();
    } else {
      return res.status(200).json({
        status: "success",
        message: "Category does not exist",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: "Category does not exist",
    });
  }
};
