const nodemailer = require("nodemailer");

module.exports.sendEmail=async(options)=>{


  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "mh6151794@gmail.com", // generated ethereal user
      pass: "wzvfcruwimcztgtd", // generated ethereal password
    },
  });



  // send mail with defined transport object
  transporter.sendMail({
      from: '"frog" <mh6151794@gmail.com>', // sender address
    to: options.email, // list of receivers
    subject: "Hello ✔", // Subject line
    html:  `<b>Hello world?</b>
    <h1>${options.message}</h1>
    <a href = "http://localhost:3000/users/verify/${options.token}" target = "_blank" >verify</a>
    `
    
},(err,info)=>{
    if (err) {
        return res.json(err);
    } else {
        return res.json(info);
    }
});
}
