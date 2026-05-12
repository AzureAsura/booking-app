import express from 'express'
import userAuth from "../middleware/userAuth.js"
import { requireAdmin } from "../middleware/roleMiddleware.js"
import { getPendingHotels, approveHotel, rejectHotel } from "../controller/adminController.js"

const adminRouter = express.Router()

adminRouter.get('/hotels', userAuth, requireAdmin, getPendingHotels)
adminRouter.post('/hotels/:id/approve', userAuth, requireAdmin, approveHotel)
adminRouter.post('/hotels/:id/reject', userAuth, requireAdmin, rejectHotel)

export default adminRouter
