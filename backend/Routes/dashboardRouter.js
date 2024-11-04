const express = require('express')
const router = express.Router()
const dashBoardController = require('../Controller/dashboardControler')


router.get('/Dashboard/:email', dashBoardController.findEmployee)

module.exports = router
