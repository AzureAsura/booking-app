
import { prisma } from "../config/db.js"

export const getUserData = async (req, res) => {
    try {

        const userId = req.user.id

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        res.json({
            success: true,
            userData: {
                id: user.id,
                name: user.name,
            }
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}