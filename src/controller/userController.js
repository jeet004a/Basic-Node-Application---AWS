import User from '../models/UserModel.js'
import { createToken, genSalt, hasedPassword } from '../utils/userUtils.js'

export const signUpController = async(req, res, next) => {
    try {
        const { email, fullName, password } = req.body
            // console.log(email, fullName, password)
        const exitinUser = await User.findOne({ email: email })
        if (exitinUser) {
            return res.status(200).json({
                success: false,
                msg: "User already exisit with this email id"
            })
        }
        const salt = await genSalt()

        const hashPassword = await hasedPassword({ password: req.body.password, salt })
        req.body.password = hashPassword
        req.body.salt = salt
        const user = new User(req.body)
        await user.save()
        return res.status(201).json({
            success: true,
            msg: "User created successfully"
        })
    } catch (error) {
        console.log('error from signup controller')
        return res.status(500).json({
            success: false,
            msg: "something went wrong from signup user controller"
        })
    }
}


export const signInController = async(req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email }).select('+password').select('+salt')
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User is not found"
            })
        }

        const hashPassword = await hasedPassword({ password: req.body.password, salt: user.salt })

        if (hashPassword === user.password) {

            const token = createToken({ email: user.email, id: user._id })
                // console.log(token)
            return res.status(200).json({
                success: true,
                msg: "User signed in successfully",
                user,
                token: token
            })
        }

        return res.status(500).json({
            success: false,
            msg: "Password was incorrect",
        })
    } catch (error) {
        console.log('error from signin controller', error)
        return res.status(500).json({
            success: false,
            msg: "something went wrong from signin user controller"
        })
    }
}


export const userProfileController = async(req, res, next) => {
    try {
        // console.log(req.user.email)
        const user = await User.findOne({ email: req.user.email })
        return res.status(200).json({
            success: true,
            msg: "Profile Verified",
            user
        })
    } catch (error) {
        console.log('error from user profile controller', error)
        return res.status(500).json({
            success: false,
            msg: "something went wrong"
        })
    }
}