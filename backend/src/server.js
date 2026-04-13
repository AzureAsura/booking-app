import 'dotenv/config'
import express from 'express'
import { config } from "dotenv"
import cors from 'cors'
import { connectDB, disconnectDB } from "./config/db.js"
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/authRoutes.js"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true}))

config()
connectDB()

app.use('/auth', authRoutes)

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