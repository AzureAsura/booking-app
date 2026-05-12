import { prisma } from "../config/db.js";

export const getPendingHotels = async ( req, res ) => {
    try {
        const status = req.query.status || 'pending'
        const hotels = await prisma.hotel.findMany({
            where: { status },
            include: { 
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })

        res.json({
            success: true,
            hotels
        })

    } catch (error) {

        res.json({
            success: false,
            error: error.message
        })
        
    }
}

export const approveHotel = async ( req, res ) => {
    try {
        const { id } = req.params
        const hotel = await prisma.hotel.findUnique({
            where: { id },
        })

        if (!hotel) {
            return res.json({
                success: false,
                message: 'Hotel not found'
            })
        }

        await prisma.$transaction([
            prisma.hotel.update({
                where: {
                    id
                },
                data: ({
                    status: 'approved',
                    reviewedAt: new Date(),
                    reviewedById: req.user.id
                })
            }),

            prisma.user.update({
                where: { id: hotel.ownerId },
                data: {
                   role: 'hotelOwner'
                }
            })
        ])

        res.json({
            success: true,
            message: 'Hotel approved'
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

export const rejectHotel = async ( req, res ) => {
    try {
        const { id } = req.params
        const { reasons }  = req.body

        await prisma.hotel.update({
            where: { id },
            data: {
                status: 'rejected',
                rejectionReason: reasons || null,
                reviewedAt: new Date(),
                reviewedById: req.user.id
            }
        })

        res.json({
            success: true,
            message: 'Hotel rejected'
        })


    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }

}