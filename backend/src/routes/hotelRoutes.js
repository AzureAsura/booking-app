import express from "express"
import userAuth from "../middleware/userAuth.js"
import { getHotel, listHotel, myHotel, registerHotel } from "../controller/hotelController.js"
import upload from "../middleware/uploadMiddleware.js"

const hotelRouter = express.Router()

hotelRouter.post('/', userAuth, upload.single("image"), registerHotel)
hotelRouter.get('/', listHotel)
hotelRouter.get('/mine', userAuth, myHotel)
hotelRouter.get('/:id', getHotel)

export default hotelRouter