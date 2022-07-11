const  mongoose  = require("mongoose");
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');
const userSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique:true
    },
    hashedPassword:{
        type: String,
        required: true,
        select: false
    },
    about:{
        type: String,
        trim: true,
    },
    salt: String,
    role:{
        type: Number,
        default:0 //0 for normal user and 1 for admin
    },
    history:{
        type: Array,
        default: []
    }
},
{timestamps: true}
)


//virtual fields
userSchema.virtual('password').set(function(password) {
    this._password = password
    this.salt = uuidv4()
    this.hashedPassword = this.encryptPassword(password)
}).get(function() {
    return this._password
})

userSchema.methods = {
    encryptPassword: function(password){
        if(!password) return '';
        try{
            return crypto.createHmac('sha1', this.salt).update(password).digest("hex")
        }catch(err){
            return ""
        }
    }
}

module.exports = mongoose.model("User", userSchema)