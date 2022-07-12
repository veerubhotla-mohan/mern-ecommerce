const  {expressjwt}  = require('express-jwt')
const jwt = require('jsonwebtoken')
const User = require("../models/UserModel")

exports.signup = async (req, res) => { 
    try{
        const newUser = (req.body)
        const userCreated = await User.create(newUser)
        return res.status(200).json({
            status: "success",
            message: "New User Created Successfully",
        })
    }catch(err){
        const errMsg = (err.message)
        return res.status(400).json({
            status: "fail",
            message: "User creation failed",
            error: (errMsg)
        })
    }
}

exports.signin = async (req, res) => { 
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                status: "fail",
                message: "User with given mail not found"
            })
        }
        else{
            // check password
            if(!user.authenticateUser(password)){
                return res.status(401).json({
                    status: "fail",
                    message: "Incorrect credentials"
                })
            }
            //generate token
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
            res.cookie("t", token, {expire: new Date() + 9999});

            const {_id, name, email, role} = user;
            return res.status(200). json({
                status: "success",
                token, 
                user: {_id, email, name, role}
            })
        }
    }catch(err){
        return res.status(500).json({
            status: "fail",
            message: "Internal server error occured"
        })
    }
}

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.status(200).json({
        status: "success",
        message: "Sign out successfull"
    })
}

exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
  });

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id.toString() == String(req.auth._id);
    if(!user){
        return res.status(403).json({
            error: "Access denied. Please login"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Access denied. Please login as admin" 
        })
    }
    next();
}