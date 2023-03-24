const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT

const mongoose = require('mongoose')


app.use(express.json())


app.use('/users',require("./api/user.api"))
app.use('/data',require("./api/data.api"))

app.use((err,req,res,next)=>{
res.json(err.message)
// res.json(err.statusCode)
// res.json(err.stack)
})


app.get('/', async (req,res)=>{
    return res.send("Hello World")
})

app.get('*', async (req,res)=>{
    return res.json({message:"404 not found page"})
})


mongoose.set('strictQuery',true)

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log(`database connectd on ${process.env.CONNECTION_STRING}`);
}).catch((err)=>{
    console.log(`fail to connect db ${err}`);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
