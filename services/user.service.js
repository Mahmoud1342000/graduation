const userModel = require("../models/user.model");
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const { sendEmail } = require("../emails/user.email");


module.exports.signup = async (req, res) => {

    const { name, email, password, age } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
        res.json({ message: "email already exists" })
    } else {
        bcrypt.hash(password, process.env.ROUND, async function (err, hash) {
            await userModel.insertMany({ name, email, password: hash, age })
            let token = jwt.sign({ email }, "verify", { expiresIn: 60 });
            sendEmail({ email, token, message: "hello" });
            res.json({ message: "success" })
        });

    }



}

module.exports.signin = async (req, res) => {
    const { email, password } = req.body
    let user = await userModel.findOne({ email })
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {

            let token = jwt.sign({ userid: user._id, name: user.name, emailConfirm: user.emailConfirm }, process.env.JWT_KEY)
            if (user.emailConfirm == true) {
                res.json({ message: "login", token })
            } else {
                res.json({ message: "email not verified" })
            }
        } else {
            res.json({ message: "incorrect password" })
        }
    } else {
        res.json({ message: "email does not exist" })
    }

}


module.exports.emailVerify = async (req, res) => {
    const { token } = req.params;
    jwt.verify(token, "verify", async (err, decoded) => {
        if (err) {
            res.json(err);
        } else {
            let user = await userModel.findOne({ email: decoded.email });
            if (user) {
                await userModel.findOneAndUpdate(
                    { email: decoded.email },
                    { emailConfirm: true }
                );
                res.json({ message: "verified" });
            } else {
                res.json({ message: "user not found" });
            }
        }
    });
};
