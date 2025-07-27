import express from 'express'
import { config } from 'dotenv'
config()
import userRouter from './routes/userRoutes.js'
import { dbConnection } from './dbConnection.js'
const app = express()
const PORT = process.env.PORT


app.use(express.json())
app.use(userRouter)

dbConnection()
app.get('/', (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            msg: "hello from server jeet kaise ho aap"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Something went wrong"
        })
    }
})

app.get('/index', (req, res, next) => {
    try {
        res.send("<h1>Hi User</h1>")
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: "Something went wrong"
        })
    }
})



app.listen(PORT, () => {
    console.log(`Server started at 4000 port`)
})