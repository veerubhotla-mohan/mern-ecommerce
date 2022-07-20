const express = require("express");
const authController = require("../controllers/authController");
const categoryController = require("../controllers/categoryController");
const userController = require("../controllers/userController");

const router = express.Router();

router.param("userId", userController.userById);
router.param("categoryId", categoryController.categoryById);
router.post(
  "/category/create/:userId",
  authController.requireSignin,
  authController.isAuth,
  authController.isAdmin,
  categoryController.createCategory
);
router.put(
  "/category/:categoryId/:userId",
  authController.requireSignin,
  authController.isAuth,
  authController.isAdmin,
  categoryController.updateCategory
);
router.delete(
  "/category/:categoryId/:userId",
  authController.requireSignin,
  authController.isAuth,
  authController.isAdmin,
  categoryController.deleteCategory
);
router.get("/category/:categoryId", categoryController.readCategoryById);
router.get("/categories", categoryController.listCategories);
module.exports = router;
