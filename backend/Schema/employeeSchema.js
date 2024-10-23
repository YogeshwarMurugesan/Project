const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    empid: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
        trim: true
    },
    dob: { type: String, required: true },
    phNo: { type: String, required: true },
    gender: { type: String, required: true },
    jobTitle: { type: String, required: true },
    department: { type: String, required: true },
    workLocation: { type: String, required: true },
    doj: { type: String, required: true },
    empType: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true }
})

module.exports = mongoose.model('Employee', employeeSchema)