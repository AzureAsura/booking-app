import { prisma } from "../config/db.js";

const checkAvailability = async ({ checkInDate, checkOutDate, roomId }) => {
    try {

        const bookings = await prisma.booking.findMany({
            where: {
                roomId,

                AND: [
                    {
                        checkInDate: {
                            lte: new Date(checkOutDate)
                        }
                    },
                    {
                        checkOutDate: {
                            gte: new Date(checkInDate)
                        }
                    }
                ]
            }
        })

        return bookings.length === 0
    } catch (error) {
        console.error(error.message)
    }
}

export const checkAvailabilityAPI = async (req, res) => {

    try {

        const { room, checkInDate, checkOutDate } = req.body

        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room })

        res.json({ success: true, isAvailable })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

export const createBooking = async (req, res) => {
    try {

        const { room, checkInDate, checkOutDate, guests } = req.body
        const user = req.user.id

        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room })

        if (!isAvailable) {
            return res.json({ success: false, message: 'Room is not Available' })
        }

        const roomData = await prisma.room.findUnique({
            where: {
                id: room
            },
            include: {
                hotel: true
            }
        })

        let totalPrice = roomData.pricePerNight

        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime()
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))

        totalPrice *= nights

        const booking = await prisma.booking.create({
            data: {
                userId: user,
                roomId: room,
                hotelId: roomData.hotel.id,
                guests: +guests,
                checkInDate,
                checkOutDate,
                totalPrice
            }
        })

        res.json({ success: true, message: 'Booking created Successfully' })

    } catch (error) {
        res.json({ success: false, message: 'Failed to create booking' })
    }
}

export const getUserBookings = async (req, res) => {

    try {
        const user = req.user.id
        const booking = await prisma.booking.findMany({
            where: {
                userId: user
            },
            include: {
                room: true,
                hotel: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        res.json({ success: true, booking })
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch bookings' })
    }
}

export const getHotelBookings = async (req, res) => {

    try {

        const owner = req.user.id

        const bookings = await prisma.booking.findMany({
            where: {
                room: {
                    hotel: {
                        ownerId: ownerId
                    }
                }
            },
            include: {
                room: {
                    include: {
                        hotel: true
                    }
                },
                user: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        const totalBookings = bookings.length

        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)

        res.json({
            success: true, dashboardData: {
                totalBookings,
                totalRevenue,
                bookings
            }
        })

    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch bookings' })
    }
}