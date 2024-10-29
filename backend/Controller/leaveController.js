const leaveSchema = require('../Schema/leaveSchema')

exports.addleave = async (req, res) => {
    try {
        const { startDate, endDate, leaveType, user } = req.body

        console.log(req.body);

        const leave = await leaveSchema.create({
            startDate, endDate, leaveType, user
        })

        res.status(201).json(leave)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

exports.showLeave = (req, res) => {
    try {
        const { email } = req.body

        const findUser = leaveSchema.findOne({ email })

        if (!findUser) {
            res.status(201).send('User Not Found')
        }

        res.status(201).json(findUser)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}