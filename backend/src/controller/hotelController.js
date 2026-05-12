import { prisma } from "../config/db.js"
import { v2 as cloudinary } from "cloudinary"

export const registerHotel = async (req, res) => {

    try {
        const { name, address, contact, city } = req.body
        const owner = req.user.id

        const existing = await prisma.hotel.findFirst({
            where: { ownerId: owner }
        })

        if (existing) {
            return res.json({ success: false, message: "You already have a hotel submission" })
        }

        if (!req.file) {
            return res.json({ success: false, message: "Hotel image is required" })
        }

        const imageResult = await cloudinary.uploader.upload(req.file.path)

        await prisma.hotel.create({
            data: {
                name,
                address,
                contact,
                city,
                image: imageResult.secure_url,
                status: "pending",
                ownerId: owner
            }
        })

        res.json({ success: true, message: "Hotel submitted for review. Wait for admin approval." })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const listHotel = async (req, res) => {
    try {
        const hotels = await prisma.hotel.findMany({
            where: {
                status: 'approved'
            },
              select: { id: true, name: true, address: true, city: true, image: true, contact: true }
        })

        res.json({
            success: true,
            hotels
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getHotel = async (req, res) => {
    try {
        const { id } = req.params
        const hotel = await prisma.hotel.findUnique({
            where: { id },
            include: {
                rooms: {
                    where: {
                        isAvailable: true,
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        if (!hotel) {
            return res.json({
                success: false,
                message: 'Hotel not found'
            })
        }

        if (hotel.status !== "approved") return res.json({ success: false, message: "Hotel not available" })

        res.json({
            success: true,
            hotel
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const myHotel = async (req, res) => {
    try {
        const hotel = await prisma.hotel.findFirst({
            where: {
                ownerId: req.user.id
            }
        })

        res.json({ success: true, hotel })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}