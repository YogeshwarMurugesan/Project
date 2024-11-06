const employeeSchema = require('../Schema/employeeSchema')
const authSchema = require('../Schema/authSchema')
const bcrypt = require('bcrypt')

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

   } catch (error) {
      console.log(error)
      res.status(400).json({ error: error.message })
   }

}

exports.updatePassword = async (req, res) => {
   const { email } = req.params
   const { currentPassword, newPassword, confirmPassword } = req.body

   try {
      const findUser = await authSchema.findOne({ email })
   console.log(findUser)

      if (!findUser) {
         return res.status(404).send('User is not found')
      }

      const isMatch = await bcrypt.compare(currentPassword, findUser.password)


      if (!isMatch) {
         return res.status(400).send('Current password is incorrect')
      }

      if (newPassword !== confirmPassword) {
         return res.status(400).send('New password and confirm password do not match')
      }

      findUser.password = await bcrypt.hash(newPassword, 10);

      await findUser.save()
      res.status(200).send('Password updated successfully')
   } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).send('Server error');
   }


}
