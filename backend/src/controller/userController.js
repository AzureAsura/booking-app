
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
                email: user.email,
                image: user.image,
                role: user.role,
                recentSearchedCities: user.recentSearchedCities
            }
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const storeRecentSearchedCities = async (req, res) => {
    try {

        const { recentSearchedCities } = req.body
        
        const userId = req.user.id

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        let cities = user.recentSearchedCities

        if (cities.length < 3) {
            cities.push(recentSearchedCity)
        } else {
            cities.shift()
            cities.push(recentSearchedCity)
        }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                recentSearchedCities: cities
            }
        })

        res.json({ success: true, message: "City added" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}