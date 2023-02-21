const express=require('express')
const cors=require('cors')
const { connection } = require('./config/db')
const {userRouter} = require("./routes/userRoutes")
const {dataRouter} = require('./routes/dataRoutes')
const { authenticate } = require('./middleware/authenticate')

require('dotenv').config()

const app=express()

app.use(express.json())
app.use(cors())

app.get('/', (req,res)=>{
    res.send('welcome')
})


app.use('/users', userRouter)
app.use(authenticate)
app.use('/students', dataRouter)


app.listen(process.env.port, async() =>{
    try {
        await connection
        console.log('Connected to DB')
    } catch (err) {
        console.log(err.message)
    }
    console.log(`Server is running at port http://localhost:${process.env.port}`)
})