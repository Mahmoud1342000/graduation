


const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    // array:Array
    // Diabetes_binary:Number,
    HighBP:Number,
    HighChol:Number,
    CholCheck:Number,
    BMI:Number,
    Smoker:Number,
    Stroke:Number,
    HeartDiseaseorAttack:Number,
    PhysActivity:Number,
    Fruits:Number,
    Veggies:Number,
    HvyAlcoholConsump:Number,
    AnyHealthcare:Number,
    NoDocbcCost:Number,
    GenHlth:Number,
    MentHlth:Number,
    PhysHlth:Number,
    DiffWalk:Number,
    Sex:Number,
    Age:Number,
    Education:Number,
    Income:Number,
},{
    timestamps:true,
})

const dataModel = mongoose.model("data",dataSchema)

module.exports = dataModel