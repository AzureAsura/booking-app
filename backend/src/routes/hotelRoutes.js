import express from "express"
import userAuth from "../middleware/userAuth.js"
import { registerHotel } from "../controller/hotelController.js"


const hotelRouter = express.Router()

hotelRouter.post('/', userAuth , registerHotel)



export default hotelRouter