import { Router } from 'express'
import { payment, createCharges } from '../controllers/payment.controller'
const router = Router()

// getPayment API

router
  .route('/')
  .get(payment)
  .post(createCharges)

export default router
