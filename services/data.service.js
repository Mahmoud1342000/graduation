const ort = require('onnxruntime-node');
const dataModel = require("../models/data.model");
const AppError = require('../utils/AppError');
const catchAsyncError = require('../utils/CatchAsync');



async function get_data(array) {
    try {

        const session = await ort.InferenceSession.create('./diabetes-model.onnx');

        inputName = session.handler.inputNames
        outputName = session.handler.outputNames

        const data = Float32Array.from(array);
        const tensor = new ort.Tensor('float32', data, [1,21]);

        const feeds = {x: tensor};

        const results = await session.run(feeds);
        // console.log(results);
        const output = results[outputName].data;

        return output

    } catch (e) {
        return res.json(`failed to inference ONNX model: ${e}.`);
    }
}


module.exports.addData = catchAsyncError(async (req, res,next) => {
    let arr = []
    for (const key in req.body) {
        arr.push(req.body[key])
    }
    let array = arr
    await dataModel.insertMany(req.body)
    const result = await get_data(array)
    return res.status(200).json({ message: "success" , result });
  });


module.exports.getAllData = catchAsyncError(async (req, res,next) => {
    let data = await dataModel.find({})
    if (data) {
        return res.status(200).json({ message: "success", data })
    } else {
        return next(new AppError("data not found",400))
    }
})


module.exports.updateData = catchAsyncError(async (req, res,next) => {
    const { id } = req.params
    let data = await dataModel.findByIdAndUpdate(id, req.body, { new: true })
    if (data) {
        return res.status(200).json({ message: "updated" })
    } else {
        return next(new AppError("data not found",400))
    }
})


module.exports.deleteData = catchAsyncError(async (req, res,next) => {
    const { id } = req.params
    let data = await dataModel.findByIdAndDelete(id)
    if (data) {
        return res.status(200).json({ message: "deleted" })
    } else {
        return next(new AppError("data not found",400))
    }
})
