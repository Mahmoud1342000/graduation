const { auth } = require('../middleware/authentication/auth')
const { addReport, getAllReports, userReports, updateReport, deleteReport } = require('../services/report.service')

const router = require('express').Router()

router.post('/',auth,addReport)
.get('/',getAllReports)
.get('/userReports',userReports)
.put('/',updateReport)
.delete('/',deleteReport)



module.exports = router