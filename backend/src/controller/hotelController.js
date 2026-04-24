import { prisma } from "../config/db.js"

export const registerHotel = async (req, res) => {

    try {
        const { name, address, contact, city } = req.body

        const owner = req.user.id

        const hotel = await prisma.hotel.findFirst({
            where: {
                ownerId: owner
            }
        })

        if (hotel) {
            res.json({ success: false, message: "Hotel Already Registered" })

        }

        await prisma.hotel.create({
            data: {
                name,
                address,
                contact,
                city,
                ownerId: owner
            }
        })

        await prisma.user.update({
            where: {
                id: owner
            },
            data: {
                role: "hotelOwner"
            }
        })

        res.json({ success: true, message: "Hotel Registered Successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}