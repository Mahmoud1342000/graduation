const { auth } = require('../middleware/authentication/auth')
const { addData, getAllData, updateData, deleteData, getUserData } = require('../services/data.service')

const router = require('express').Router()

router.post('/',auth,addData)
.get('/',getAllData)
.get('/userData',auth,getUserData)
.put('/:id',auth,updateData)
.delete('/:id',auth,deleteData)



module.exports = router