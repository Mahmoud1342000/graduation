


const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    emailConfirm:{
        type:Boolean,
        default:false
    }
})

const userModel = mongoose.model("patient",patientSchema)

module.exports = userModel