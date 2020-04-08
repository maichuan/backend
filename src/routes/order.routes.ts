import Router from 'express'
import {
  getConfirmOrder,
  postConfirmOrder,
  orderComplete,
} from '../controllers/order.controller'

const router = Router()

router
  .route('/')
  .get(getConfirmOrder)
  .post(postConfirmOrder)

router.route('/complete').post(orderComplete)

export default router
