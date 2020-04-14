import Router from 'express'
import {
  getConfirmOrder,
  postConfirmOrder,
  orderComplete,
  getOrderByRestaurantId,
} from '../controllers/order.controller'

const router = Router()

router
  .route('/')
  .get(getConfirmOrder)
  .post(postConfirmOrder)

router.route('/:resId').get(getOrderByRestaurantId)

router.route('/complete').post(orderComplete)

export default router
