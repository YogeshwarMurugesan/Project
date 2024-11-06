const authModel = require('../Schema/authSchema');
const empModel = require('../Schema/employeeSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.register = async (req, res) => {
    const { name, email, password } = req.body

    try {

        const findEmp = await empModel.findOne({ email })

        if (!findEmp) {
            return res.status(409).json('Employee is Not Found! Please contact ADMIN and add the Employee First.')
        }
        const findUser = await authModel.findOne({ email })

        if (findUser) {
            return res.status(409).json('User is already exists')
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await authModel.create({ name, email, password : hashedPassword} )
        return res.status(201).json('User Added Successfully')

    } catch (error) {
        console.log('error : ' + error)
        return res.send(error)
    }
}

exports.logIn = async (req, res) => {
    const { email, password } = req.body

    try {

        const findUser = await authModel.findOne({ email })

        if (!findUser) {
            return res.status(400).json({ error: 'Please Register' })
        }

        const passwordMatch =await bcrypt.compare(password, findUser.password)
        
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Password Incorrect' })
        }

        console.log('Login  Successfully')

        const token = jwt.sign(
            {
                id: findUser._id,
                email: findUser.email,
                name: findUser.name,
                role: findUser.role
            }, "thisiskey", { expiresIn: '1h' }
        )

        return res.status(201).json({ message: 'Login  Successfully', token: token })


    } catch (error) {
        console.log('error : ' + error)
        return res.send(error)
    }
}

exports.createAdmin = async () => {

    const name = process.env.ADMIN_NAME  
    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD


    try {
        const adminExist = await authModel.findOne({ role: 'admin' })

        if (adminExist) {
            return console.log('Adimin is alreay exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await authModel.create({ name, email, password : hashedPassword, role: 'admin' })
        console.log('admin created')
    } catch (error) {
        console.log(error)
    }
}
