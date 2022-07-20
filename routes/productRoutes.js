const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");

const router = express.Router();

router.param("userId", userController.userById);
router.param("productId", productController.productById);

router.get("/product/:productId", productController.getProductById);
router.post(
  "/product/create/:userId",
  authController.requireSignin,
  authController.isAuth,
  authController.isAdmin,
  productController.createProduct
);
router.delete(
  "/product/:productId/:userId",
  authController.requireSignin,
  authController.isAuth,
  authController.isAdmin,
  productController.deleteProduct
);
router.put(
  "/product/:productId/:userId",
  authController.requireSignin,
  authController.isAuth,
  authController.isAdmin,
  productController.updateProduct
);

module.exports = router;
