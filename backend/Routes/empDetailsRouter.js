const express = require('express')
const { getEmployees } = require('../Controller/empDetailsController')
const router = express.Router()

router.get('/Employees', getEmployees)

module.exports = router
