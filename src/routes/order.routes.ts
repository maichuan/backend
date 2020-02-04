import Router from 'express'
import {
  getConfirmOrder,
  postConfirmOrder,
} from '../controllers/order.controller'

const router = Router()

router
  .route('/')
  .get(getConfirmOrder)
  .post(postConfirmOrder)

export default router
