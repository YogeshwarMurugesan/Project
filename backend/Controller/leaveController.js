const leaveSchema = require('../Schema/leaveSchema')

exports.addleave = async (req, res) => {
    try {
        const { startDate, endDate, leaveType, user } = req.body

        const leave = await leaveSchema.create({
            startDate, endDate, leaveType, user
        })

        res.status(201).json(leave)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

exports.showLeave =async (req, res) => {
    try {
        const email = req.params.email      

        console.log(email)

        const findUser =await leaveSchema.find( {email} )

        if (!findUser) {
            res.status(201).send('User Not Found')
        }

        res.status(201).json(findUser)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}