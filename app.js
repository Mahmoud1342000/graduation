const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT

const mongoose = require('mongoose')


app.use(express.json())


app.use('/users',require("./api/user.api"))



app.get('*', async (req,res)=>{
    res.json({message:"404 not found page"})
})


mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("database connectd");
}).catch((err)=>{
    console.log(err);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))