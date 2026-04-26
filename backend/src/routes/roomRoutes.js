import express from "express"
import userAuth from "../middleware/userAuth.js"
import { createRooms, getOwnerRooms, getRooms, toggleRoomAvailabilty } from "../controller/roomController.js"
import upload from "../middleware/uploadMiddleware.js"


const roomRouter = express.Router()

roomRouter.post('/', upload.array("images", 4) ,userAuth , createRooms)
roomRouter.get('/', getRooms)
roomRouter.get('/owner', userAuth ,getOwnerRooms)
roomRouter.post('/toggle-availability', userAuth, toggleRoomAvailabilty)



export default roomRouter