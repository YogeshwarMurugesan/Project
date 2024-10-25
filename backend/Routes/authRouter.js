const express = require('express')
const router = express.Router()
const authController = require('../Controller/empDetailsController')

router.post('/', authController.register)

module.exports = router