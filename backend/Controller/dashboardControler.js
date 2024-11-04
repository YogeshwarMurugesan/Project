const employeeSchema = require('../Schema/employeeSchema')

exports.findEmployee = async (req, res) => {
    const { email } = req.params

    const findUser = await employeeSchema.findOne({ email })
 

    if (!findUser) {
       return res.status(404).send('User is not found')
    }
    res.status(201).json(findUser)
 }

 exports.getEmployee = async (req, res) => {

   try {
      const User = await employeeSchema.find()
      res.status(201).json(User)
   console.log(User)

   } catch (error) {
      console.log(error)
      res.status(400).json({ error: error.message })
   }

}