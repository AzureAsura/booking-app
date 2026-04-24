import 'dotenv/config'
import express from 'express'
import { config } from "dotenv"
import cors from 'cors'
import { connectDB, disconnectDB } from "./config/db.js"
import cookieParser from 'cookie-parser'
import authRouter from'./routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import hotelRouter from './routes/hotelRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import roomRouter from './routes/roomRoutes.js'

const app = express()

const allowedOrigins = ['http://localhost:3000']

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true}))

config()
connectDB()
connectCloudinary()

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/hotels', hotelRouter)
app.use('/rooms', roomRouter)

const PORT = 5001
const server = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

process.on('uncaughtException', async (err) => {
    console.error('uncaughtException: ', err)
    await disconnectDB()
    process.exit(1)

})

process.on('unhandledRejection', async (err) => {
    console.error('unhandledRejection: ', err)
    server.close(async () => {
        await disconnectDB()
        process.exit(1)
    })
})

process.on('SIGTERM', async (err) => {
    console.error('SIGTERM')
    server.close(async () => {
        await disconnectDB()
        process.exit(1)
    })
})