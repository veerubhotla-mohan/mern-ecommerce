const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.param('userId', userController.userById)
router.get("/secret/:userId",authController.requireSignin, authController.isAuth, authController.isAdmin, (req, res) => {
    res.status(200).json({
        status: "success",
        user: req.profile
    })
})

module.exports = router