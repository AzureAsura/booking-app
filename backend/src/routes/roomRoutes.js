import express from "express"
import userAuth from "../middleware/userAuth.js"
import { createRooms } from "../controller/roomController.js"
import upload from "../middleware/uploadMiddleware.js"


const roomRouter = express.Router()

roomRouter.post('/', upload("images", 4) ,userAuth , createRooms)



export default roomRouter