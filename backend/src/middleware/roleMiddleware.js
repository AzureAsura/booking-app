import { prisma } from '../config/db.js'

export const requireAdmin = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { role: true }
        })
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access required' })
        }
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const requireHotelOwner = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { role: true }
        })
        if (!user || user.role !== 'hotelOwner') {
            return res.status(403).json({ success: false, message: 'Hotel owner access required' })
        }
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
