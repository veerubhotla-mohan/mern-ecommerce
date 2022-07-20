const formidable = require("formidable");
const lodash = require("lodash");
const Product = require("../models/productModel");
const fs = require("fs");

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        status: "failed",
        message: "Image upload failed",
      });
    }
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        status: "fail",
        message: "mandatory fields are missing",
      });
    }
    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          status: "failed",
          message: "image size should be less than 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          status: "fail",
          message: "Product creation failed",
        });
      }
      res.status(200).json(result);
    });
  });
};

exports.getProductById = (req, res, next) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.deleteProduct = async (req, res) => {
  try {
    let product = req.product;
    await Product.findByIdAndDelete(product._id);
    return res.status(200).json({
      status: "success",
      message: "Product deleted",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Product deletion failed",
    });
  }
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        status: "failed",
        message: "Image upload failed",
      });
    }
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        status: "fail",
        message: "mandatory fields are missing",
      });
    }
    let product = req.product;
    product = lodash.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          status: "failed",
          message: "image size should be less than 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          status: "fail",
          message: "Product creation failed",
        });
      }
      res.status(200).json(result);
    });
  });
};

exports.productById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (product) {
      req.product = product;
      next();
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: "Product not found",
    });
  }
};
