const express = require('express')
const PORT = 3001
const mongoose = require('mongoose')
const empDetailsrouter = require('./Routes/empDetailsRouter') 
const cors = require('cors')
const authRouter = require('./Routes/authRouter')
const dashboardRouter = require('./Routes/dashboardRouter')
const leaveRouter = require('./Routes/leaveRouter')
const {createAdmin} = require('./Controller/authController')
const app = express()
app.use(express.json()) 


mongoose.connect('mongodb+srv://yogeshwarmurugesan4:%40Manikandan4444@cluster0.snxag.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('mongoose is connected')
}).catch((err) => {
    console.log('mongoose is not connected')
});

app.use(cors())
app.use(empDetailsrouter)
app.use(authRouter)
app.use(leaveRouter)
app.use(dashboardRouter)
createAdmin()


app.listen(PORT, ()=>{
    console.log('Port is listening on : '+ PORT)
})