import { Router } from 'express'
import { getQrcodes, createQrCodes } from '../controllers/qrcode.controller'

const router = Router()

router
  .route('/:restaurantId')
  .get(getQrcodes)
  .post(createQrCodes)

export default router
