import { prisma } from "../config/db.js";
import { v2 as cloudinary } from "cloudinary";

export const createRooms = async (req, res) => {

    try {
        const { roomType, pricePerNight, amenities } = req.body

        const owner = req.user.id

        const hotel = await prisma.hotel.findFirst({
            where: {
                ownerId: owner
            }
        })

        if (!hotel) {
            return res.json({ success: false, message: 'No hotel found' })
        }

        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path)
            return response.secure_url
        })

        const images = await Promise.all(uploadImages)

        await prisma.room.create({
            data: {
                roomType,
                pricePerNight,
                amenities: JSON.parse(amenities),
                images,
                isAvailable: true,
                hotelId: hotel.id
            }
        })

        res.json({ success: true, message: 'Room created Successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

export const getRooms = async (req, res) => {

    try {
        const rooms = await prisma.room.findMany({
            where: {
                isAvailable: true
            },
            include: {
                hotel: {
                    include: {
                        owner: {
                            select: {
                                image: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        res.json({ success: true, rooms })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}