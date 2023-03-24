const jwt = require("jsonwebtoken");
const AppError = require("../../utils/AppError");


module.exports.auth = (req, res, next) => {
  try {
    
    const token = req.header('token')
    
    jwt.verify(token, "medical", async function (err, decoded) {
      if (err) {
        return next(new AppError(err,401))
      } else {
        req.id = decoded.userid
        return next()
      }
    });
    
  } catch (error) {
    return res.status(500).json(error)
  }
}
