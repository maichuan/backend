import { Router } from 'express'
import { indexWelcome } from '../controllers/index.controller'
import { getOrder, getOrders } from '../controllers/me.controller'
const router = Router()

// User profile API
// const reqBody = {
//   token: 'hfijreigjioefjiooi4r94f',
// }
// const body = {
//   name: 'Kong',
//   imgURL: 'fkdmflkvd',
//   TBA
// }
router.route('/').get(indexWelcome)

// Current Order
// const body = {
//   queue: 1,
//   orderStatus: 'processing',
//   menu: 'Padthai',
// }
router.route('/order').get(getOrder)

// Order History
// const body = {
//   histories: [{menu: 'padthai', status: 'success'}, {...}]
// }
router.route('/orders').get(getOrders)

export default router
