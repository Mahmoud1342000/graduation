const Joi = require('joi');


const schema = Joi.object({
    name:Joi.string().required().min(3).max(10),
    email:Joi.string().email(),
    password:Joi.string().pattern(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/),
    repassword:Joi.ref("password"),
    age:Joi.number().min(16)
})


module.exports.userValidation = (req,res,next)=>{
    try {
        
        let errorArray = []
        let {error} = schema.validate(req.body,{abortEarly:false})
        if (error) {
            error.details.map((msg)=>{
                errorArray.push(msg.message)
            })
        }
        if (errorArray.length>0) {
            return res.status(400).json(errorArray)
        } else {
            return next() 
        }
        
    } catch (error) {
        return res.status(500).json(error)
    }
}
