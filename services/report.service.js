const reportModel = require("../models/report.model");

module.exports.addReport = async (req, res) => {
  const { title, description } = req.body;

        await reportModel.insertMany({ title, description, createdBy:req.id });
        res.json({ message: "success" });
};


module.exports.getAllReports = async (req,res)=>{
    let reports = await reportModel.find({}).populate('createdBy','name email -_id')
    res.json({message:reports})
}


module.exports.userReports = async (req,res)=>{
    const createdBy = req.header('id')
    let reports = await reportModel.find({createdBy})
    res.json({message:reports})
}

module.exports.updateReport = async(req,res)=>{
    const{title,description,_id}=req.body
    await reportModel.findOneAndUpdate({_id},{title,description})
    res.json({message:"success"})
}

module.exports.deleteReport = async(req,res)=>{
    const{_id}=req.body
    await reportModel.deleteOne({_id})
    res.json({message:"deleted"})
}