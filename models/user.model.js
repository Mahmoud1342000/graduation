


const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    emailConfirm:{
        type:Boolean,
        default:false
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel