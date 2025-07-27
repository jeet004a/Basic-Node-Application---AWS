import express from 'express'
import { body } from 'express-validator'
import { signUpController, signInController, userProfileController } from '../controller/userController.js'
import { userAuth } from '../middlewares/userAuth.js'
const router = express.Router()

router.post('/signup', signUpController)
router.get('/signin', signInController)

router.get('/profile', userAuth, userProfileController)

export default router