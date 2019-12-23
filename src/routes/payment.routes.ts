import { Router } from 'express'
import { payment } from '../controllers/payment.controller'
const router = Router()

router.route('/').get(payment)

export default router
