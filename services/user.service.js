const userModel = require("../models/user.model");
const catchAsyncError = require('../utils/CatchAsync')
const AppError = require('../utils/AppError')
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const { sendEmail } = require("../emails/user.email");

module.exports.signup = catchAsyncError(async (req, res,next) => {
    const { name, email, password, age } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
        return next ( new AppError( "email already exists",401))
    } else {
        bcrypt.hash(password, 4, async function (err, hash) {
            await userModel.insertMany({ name, email, password:hash, age, emailConfirm:true })
            let token = jwt.sign({ email }, "verify", { expiresIn: 360 });
            sendEmail({ email, token, message: "hello" });
            return res.status(200).json({ message: "success" })
        });
    }
})

module.exports.signin = catchAsyncError(async (req, res,next) => {
    const { email, password } = req.body
    let user = await userModel.findOne({ email })
    if (!user || !(await bcrypt.compare(password,user.password))) 
        return next(new AppError("incorrect email or password",401))

    let token = jwt.sign({ userid: user._id, name: user.name, emailConfirm: user.emailConfirm }, process.env.JWT_KEY)
    if (user.emailConfirm == true) {
        return res.status(200).json({ message: "login", token })
    } else {
        return res.json({ message: "email not verified" })
    }
})

module.exports.emailVerify = catchAsyncError(async (req, res,next) => {
    const { token } = req.params;
    jwt.verify(token, "verify", async (err, decoded) => {
        if (err) {
            return res.json(err);
        } else {
            let user = await userModel.findOne({ email: decoded.email });
            if (user) {
                await userModel.findOneAndUpdate(
                    { email: decoded.email },
                    { emailConfirm: true }
                );
                return res.status(200).json({ message: "verified" });
            } else {
                return next(new AppError("user not found",401))
            }
        }
    });
})
