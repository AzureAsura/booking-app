import bcrypt from "bcryptjs"
import { prisma } from "../config/db.js"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.json({
            success: false,
            message: 'Missing Details'
        })
    }

    try {

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return res.json({
                success: false,
                message: 'Email already exist'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 1000
        })

        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token
            }
        })


    } catch (error) {
        return res.json({
            sucess: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({
            success: false,
            message: 'Email And Password is required'
        })
    }

    try {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            res.json({
                success: false,
                message: 'Email is not exist'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.json({
                success: false,
                message: 'Invalid Password'
            })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 1000
        })

        res.status(201).json({
            status: true,
            message: 'Succesfully Login'
        })


    } catch (error) {
        return res.json({
            sucess: false,
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({
            success: true,
            message: "Logged Out"
        })
    } catch (error) {
        return res.json({
            sucess: false,
            message: error.message
        })
    }
}