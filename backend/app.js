const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const empDetailsrouter = require('./Routes/empDetailsRouter') 

mongoose.connect('mongodb://localhost:27017/Project')
.then(() => {
    console.log('mongoose is connected')
}).catch((err) => {
    console.log('mongoose is not connected')
});

app.use(empDetailsrouter)

app.listen(PORT, ()=>{
    console.log('Port is listening on : '+ PORT)
})