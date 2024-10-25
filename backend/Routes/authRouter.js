const express = require('express')
const router = express.Router()
const authController = require('../Controller/authController')

router.get('/', authController.register)

module.exports = router