


const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    GenHlth: Number,
    Income: Number,
    DiffWalk: Number,
    PhysHlth: Number,
    Education: Number,
    PhysActivity: Number,
    BMI: Number,
    MentHlth: Number,
    HighBP: Number,
    HeartDiseaseorAttack: Number,
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user"
    }
}, {
    timestamps: true,
})

const dataModel = mongoose.model("data", dataSchema)

module.exports = dataModel