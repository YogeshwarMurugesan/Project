const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
    startDate : {type : Date, required : true},
    endDate : {type : Date, required : true},
    leaveType :{type: String, required: true},
    user :{type: String, required: true},

})

module.exports = mongoose.model('Leave', leaveSchema)