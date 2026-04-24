import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOURDINARY_CLOUD_NAME,
        api_key: process.env.CLOURDINARY_API_KEY,
        api_secret: process.env.CLOURDINARY_API_SECRET
    })
}

export default connectCloudinary