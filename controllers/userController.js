const { errorHandler } = require("../helpers/dbErrorHandler")
const User = require("../models/UserModel")

exports.signup = async (req, res) => { 
    try{
        const newUser = (req.body)
        const userCreated = await User.create(newUser)
        return res.status(200).json({
            status: "success",
            message: "New User Created Successfully",
            user: userCreated
        })
    }catch(err){
        return res.status(400).json({
            status: "fail",
            message: "User creation failed",
            error: errorHandler(err)
        })
    }
}