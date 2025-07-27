import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const SECRET = process.env.APP_SECRET
export const genSalt = async() => {
    try {
        const salt = bcrypt.genSalt()
        return salt
    } catch (error) {
        console.log('error from gensalt util function', error)
    }
}

export const hasedPassword = async(payload) => {
    try {
        const { password, salt } = payload
        const hashpassword = await bcrypt.hash(password, salt)
        return hashpassword
    } catch (error) {
        console.log('error from hashedpassword util function', error)
    }
}

export const createToken = (payload) => {
    try {
        // console.log(payload)
        const token = jwt.sign(payload, SECRET, { expiresIn: '2d' })
        return token
    } catch (error) {
        console.log('error from create token util', error)
    }
}

export const verifyToken = (data) => {
    try {
        const token = data.split(' ')[1]
            // console.log(token)
        const verrified = jwt.verify(token, SECRET)

        return verrified
    } catch (error) {
        console.log('error from verify token controller', error)
        return false
    }
}