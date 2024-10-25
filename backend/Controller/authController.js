const authModel = require('../Schema/authSchema'); 

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
};
