import express from "express"
import { getUserData, storeRecentSearchedCities } from "../controller/userController.js"
import userAuth from "../middleware/userAuth.js"


const userRouter = express.Router()

userRouter.get('/data', userAuth , getUserData)
userRouter.post('/store-recent-search', userAuth , storeRecentSearchedCities)


export default userRouter