import { Router } from 'express'
import { indexWelcome } from '../controllers/index.controller'
import { signUp, login, logout } from '../controllers/user.controller'
const router = Router()

router.route('/').get(indexWelcome)

router.route('/login').post(login)
router.route('/signup').post(signUp)
router.route('/logout').post(logout)

export default router
