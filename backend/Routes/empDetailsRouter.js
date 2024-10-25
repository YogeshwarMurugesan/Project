const express = require('express')
const router = express.Router()
const empController = require('../Controller/empDetailsController')

router.post('/api/addEmp', empController.addEmployee)

router.get('/Employees' , empController.getEmployee)

router.get('/viewProfile/:email', empController.getEmployeeByEmail)

router.put('/viewProfile/:email', empController.updateUser)

router.delete('/viewProfile/:email' ,empController.deleteEmployee )

module.exports = router
