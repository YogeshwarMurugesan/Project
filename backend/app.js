const express = require('express')
const PORT = 3001
const mongoose = require('mongoose')
const empDetailsrouter = require('./Routes/empDetailsRouter') 
const cors = require('cors')
const authRouter = require('./Routes/authRouter')
const app = express()
app.use(express.json()) 


mongoose.connect('mongodb://localhost:27017/Project')
.then(() => {
    console.log('mongoose is connected')
}).catch((err) => {
    console.log('mongoose is not connected')
});

app.use(cors())
app.use(empDetailsrouter)
app.use(authRouter)

app.listen(PORT, ()=>{
    console.log('Port is listening on : '+ PORT)
})