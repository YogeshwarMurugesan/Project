const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
    startDate : {type : Date, require : true},
    endDate : {type : Date, require : true},
    leaveType :{type: String, require: true},
    user :{type: String, require: true},

})

module.exports = mongoose.model('Leave', leaveSchema)