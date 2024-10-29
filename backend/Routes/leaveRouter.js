const express = require('express')
const router = express.Router()
const leaveControler = require('../Controller/leaveController')

router.post('/profile',leaveControler.addleave )

router.get('/profile/:email', leaveControler.showLeave)

module.exports = router