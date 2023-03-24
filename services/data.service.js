const ort = require('onnxruntime-node');
const dataModel = require("../models/data.model");
const userModel = require("../models/user.model")
const AppError = require('../utils/AppError');
const catchAsyncError = require('../utils/CatchAsync');



async function get_data(array) {
    try {

        const session = await ort.InferenceSession.create('./diabetes-model.onnx');

        inputName = session.handler.inputNames
        outputName = session.handler.outputNames

        const data = Float32Array.from(array);
        const tensor = new ort.Tensor('float32', data, [1,10]);

        const feeds = {input: tensor};

        const results = await session.run(feeds);
        const output = results['label'].data;
        // console.log(output);

        return parseInt(output) 

    } catch (e) {
        return res.json(`failed to inference ONNX model: ${e}.`);
    }
}


module.exports.addData = catchAsyncError(async (req, res,next) => {
    const {GenHlth,Income,DiffWalk,PhysHlth,Education,PhysActivity,BMI,MentHlth,HighBP,HeartDiseaseorAttack} = req.body

    let arr = []
    for (const key in req.body) {
        arr.push(req.body[key])
    }
    let array = arr
    // console.log(req.body);
    // console.log(array);
    let user_id = await userModel.findById({_id:req.id})
    if (user_id) {
        
        await dataModel.insertMany({user:req.id,GenHlth,Income,DiffWalk,PhysHlth,Education,PhysActivity,BMI,MentHlth,HighBP,HeartDiseaseorAttack})
        // await dataModel.insertMany({user:req.id})
        const result = await get_data(array)
        return res.status(200).json({ message: "success" , result });
    } else {
        return next(new AppError("user does not exist",400))
    }
  });


module.exports.getAllData = catchAsyncError(async (req, res,next) => {
    let data = await dataModel.find({}).populate("user","name -_id")
    if (data) {
        return res.status(200).json({ message: "success", data })
    } else {
        return next(new AppError("data not found",400))
    }
})


module.exports.getUserData = catchAsyncError(async (req, res,next) => {
    // const { id } = req.params;
    console.log(req.id);
    let userData = await dataModel.find({user:req.id});
    if (!userData) {
      return next(new AppError(`userData not found`, 400));
    }
    return res.status(200).json(userData);
  });


module.exports.updateData = catchAsyncError(async (req, res,next) => {
    const { id } = req.params
    let data = await dataModel.findById(id)
    if (data) {
        await dataModel.updateMany({_id:id} , req.body, { new: true })
        return res.status(200).json({ message: "updated" })
    } else {
        return next(new AppError("data not found",400))
    }
})


module.exports.deleteData = catchAsyncError(async (req, res,next) => {
    const { id } = req.params
    let data = await dataModel.findById(id)
    if (data) {
        await dataModel.deleteMany({_id:id}, { new: true })
        return res.status(200).json({ message: "deleted" })
    } else {
        return next(new AppError("data not found",400))
    }
})
