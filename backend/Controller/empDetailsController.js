const employeeSchema = require('../Schema/employeeSchema')

exports.addEmployee = async (req, res) => {

   try {
      const { 
         name,
         empid,
         email,
         dob,
         phNo,
         gender,
         jobTitle,
         department,
         workLocation,
         doj,
         empType,
         address,
         city,
         state,
         pinCode } = req.body

      const employee = await employeeSchema.create({
         name,
         empid,
         email,
         dob,
         phNo,
         gender,
         jobTitle,
         department,
         workLocation,
         doj,
         empType,
         address,
         city,
         state,
         pinCode
      })

      res.status(201).json(employee)
   } catch (error) {
      console.log(error)
      res.status(400).json({ error: error.message })
   }

}

exports.getEmployee = async (req, res) => {

   try {
      const User = await employeeSchema.find()
      res.status(201).json(User)
   } catch (error) {
      console.log(error)
      res.status(400).json({ error: error.message })
   }

}

exports.getEmployeeByEmail = async (req, res) => {
   const { email } = req.params
   const findUser = await employeeSchema.findOne({ email })

   if (!findUser) {
      return res.status(404).send('User is not found')
   }
   res.status(201).json(findUser)
}

exports.updateUser = async (req, res) => {

   try {
      const {
         name,
         empid,
         email,
         dob,
         phNo,
         gender,
         jobTitle,
         department,
         workLocation,
         doj,
         empType,
         address,
         city,
         state,
         pinCode } = req.body

      const { email: paramEmail } = req.params

      const findUser = await employeeSchema.findOneAndUpdate({ email: paramEmail }, {
         name,
         empid,
         email,
         dob,
         phNo,
         gender,
         jobTitle,
         department,
         workLocation,
         doj,
         empType,
         address,
         city,
         state,
         pinCode
      }, { new: true })

      res.status(201).json(findUser)
   }

   catch (error) {
      res.status(404).json(error)
   }
};