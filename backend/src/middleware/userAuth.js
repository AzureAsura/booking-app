import jwt from 'jsonwebtoken'

export const userAuth = async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return res.json({
            success: false,
            message: "You're not authorized, Please Login"
        })
    }

    try {

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decodeToken 

        next()
        
    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }
}


export default userAuth