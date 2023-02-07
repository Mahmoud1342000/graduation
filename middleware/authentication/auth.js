const jwt = require("jsonwebtoken")


  module.exports.auth = (req,res,next)=>{
    const token = req.header('token')

      jwt.verify(token, process.env.JWT_KEY, async function(err, decoded) {
          if (err) {
              res.json({message:"error in token or token not provided",err})
    } else {
        req.id = decoded.userid
        next()
    }
});

}