import Router from 'express'
import {
  getConfirmOrder,
  postConfirmOrder,
  orderComplete,
  getOrderByRestaurantId,
  clearOrderByRestaurantId,
  cancelOrderByUser,
} from '../controllers/order.controller'

const router = Router()

router
  .route('/')
  .get(getConfirmOrder)
  .post(postConfirmOrder)
  .put(cancelOrderByUser)

router
  .route('/:resId')
  .get(getOrderByRestaurantId)
  .post(clearOrderByRestaurantId)

router.route('/complete').post(orderComplete)

export default router
