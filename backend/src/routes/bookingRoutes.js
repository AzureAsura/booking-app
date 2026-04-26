import express from "express"
import userAuth from "../middleware/userAuth.js"
import { checkAvailabilityAPI, createBooking, getHotelBookings, getUserBookings } from "../controller/bookingController.js"


const bookingRouter = express.Router()

bookingRouter.post('/check-availability', checkAvailabilityAPI)
bookingRouter.post('/book', userAuth, createBooking)
bookingRouter.get('/user', userAuth, getUserBookings)
bookingRouter.get('/hotel', userAuth, getHotelBookings)



export default bookingRouter