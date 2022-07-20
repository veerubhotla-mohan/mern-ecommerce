const User = require("../models/userModel");

exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (user) {
      req.profile = user;
      next();
    }
  } catch (error) {
    return res.status(200).json({
      status: "fail",
      message: "Profile not found for given ID",
    });
  }
};
