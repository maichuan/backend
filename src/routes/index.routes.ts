import { Router } from 'express'
import { indexWelcome } from '../controllers/index.controller'
import { signUp, login, logout } from '../controllers/user.controller'
const router = Router()

router.route('/').get(indexWelcome)

// Welcome API
// const body = {
//   name: 'Kong',
//   trend: [
//     { id: 123, name: 'Kong', lat: 13.7, long: 105, imgUrl: 'www.....' },
//     { id: 123, name: 'Kong', lat: 13.7, long: 105, imgUrl: 'www.....' },
//   ],
//   nearby: [
//     { id: 123, name: 'Kong', lat: 13.7, long: 105, imgUrl: 'www.....' },
//     { id: 123, name: 'Kong', lat: 13.7, long: 105, imgUrl: 'www.....' },
//   ],
// }
router.route('/welcome').get(indexWelcome)

// Login API
// const reqBody = {
//   token: 'hfijreigjioefjiooi4r94f'
// }
// const body = {
//   name: 'Kong',
//   TBA
// }
router.route('/login').post(login)

// Sign up API
// const reqBody = {
//   token: 'hfijreigjioefjiooi4r94f',
//   fullName: 'Kong Uzimaki',
//   username: 'The Kong', // optional
//   email: 'varit.as@ku.th',
// }
// const body = {
//   name: 'Kong',
//   TBA
// }
router.route('/signup').post(signUp)

// Log out API
// const body = { status: success } อาจจะไม่ต้องมีให้ firebase ทำให้
router.route('/logout').post(logout)

export default router
