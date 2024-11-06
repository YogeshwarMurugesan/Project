const express = require('express')
const router = express.Router()
const dashBoardController = require('../Controller/dashboardControler')


router.get('/Dashboard/:email', dashBoardController.findEmployee)

router.get('/Dashboard' , dashBoardController.getEmployee)

router.put('/Dashboard/:email', dashBoardController.updatePassword)


module.exports = router
