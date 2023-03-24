const { userValidation } = require('../middleware/validation/user.validate')
const { signup, signin, emailVerify } = require('../services/user.service')

const router = require('express').Router()

router.post('/signup',userValidation,signup)
router.post('/signin',signin)
router.get('/verify/:token',emailVerify)

module.exports = router