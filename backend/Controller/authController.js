const authModel = require('../Schema/authSchema'); 
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const findUser =await authModel.findOne({email})

        if(findUser){
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

    console.log(req.body)
   
    try {

        const findUser = await authModel.findOne({email})
        console.log(`findUser : ${findUser}`)


        if(!findUser){
            return res.status(400).json({error : 'Please Register'})
        }
        
        const passwordMatch = bcrypt.compareSync(password,findUser.password )
        console.log(passwordMatch)

    
        if(passwordMatch){
            return res.status(400).json({error : 'Password Incorrect'})
        }

        console.log('Login  Successfully')
        const userData = {
            id : findUser._id,
            email: findUser.email,
            name :findUser.name
        }
        return res.status(201).json('Login  Successfully')
        

    } catch (error) {
        console.log('error : ' + error)
        return res.send(error)
    }
}
