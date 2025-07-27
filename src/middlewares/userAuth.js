import { verifyToken } from "../utils/userUtils.js"

export const userAuth = async(req, res, next) => {
    try {
        const userDetails = verifyToken(req.headers.authorization)
        if (userDetails) {
            req.user = userDetails
                // console.log(req.user)
            next()
        }

    } catch (error) {
        console.log('error from user Auth middlewares ', error)
        res.status(404).json({
            success: false,
            msg: "Token is expired"
        })
    }
}