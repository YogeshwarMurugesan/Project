const authModel = require('../Schema/authSchema'); 
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const findUser =await authModel.findOne({email})

        if(!findUser){
            return res.status(409).json('User is already exists')
        }

        await authModel.create({name, email, password})
        return res.status(201).json('User Added Successfully')

    } catch (error) {
        console.log('error : ' + error)
        return res.send(error)
    }
}

exports.logIn= async (req,res)=>{
    const {email, password} = req.body

    

    try {

        const findUser = await authModel.findOne({email})

        if(!findUser){
            return res.status(400).json({error : 'Email and password are required'})
        }
        
        const passwordMatch = bcrypt.compareSync(password,authModel.password )
    
        if(!passwordMatch){
            return res.status(400).json({error : 'Password Incorrect'})
        }

        return res.status(201).json('Login  Successfully')

    } catch (error) {
        console.log('error : ' + error)
        return res.send(error)
    }
}
