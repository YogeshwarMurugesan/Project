const express = require('express')
const router = express.Router()
const empController = require('../Controller/empDetailsController')

router.post('/api/addEmp', empController.addEmployee)

module.exports = router
