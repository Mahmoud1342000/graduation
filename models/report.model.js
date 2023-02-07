


const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({
    title:String,
    description:String,
    createdBy:{
        type:mongoose.SchemaTypes.ObjectId, 
        ref:"patient"  
    }
},{
    timestamps:true,
})

const reportModel = mongoose.model("report",reportSchema)

module.exports = reportModel