const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/signout", authController.signout);
router.get("/", (req, res, next) => {
  res.send(`${req.query.id}`);
});

module.exports = router;
