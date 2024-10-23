const employeeSchema = require('../Schema/employeeSchema')

exports.addEmployee = async (req, res) => {

   try {
      const { name,
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