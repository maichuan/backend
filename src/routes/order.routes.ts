import Router from 'express'
import {
  getConfirmOrder,
  postConfirmOrder,
  orderComplete,
  getOrderByRestaurantId,
  clearOrderByRestaurantId,
  cancelOrderByUser,
  pickToCook,
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
  .put(pickToCook)

router.route('/:resId/complete').post(orderComplete)

export default router
