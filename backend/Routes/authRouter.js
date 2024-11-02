const express = require('express')
const router = express.Router()
const authController = require('../Controller/authController')

router.post('/', authController.register)

router.post('/Login', authController.logIn)

module.exports = router