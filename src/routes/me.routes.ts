import { Router } from 'express'
import { indexWelcome } from '../controllers/index.controller'
import { getOrder, getOrders } from '../controllers/me.controller'
const router = Router()

router.route('/').get(indexWelcome)
router.route('/order').get(getOrder)
router.route('/orders').get(getOrders)

export default router
