import Router from 'express'
import { getOrderedByTransactionId } from '../controllers/ordered.controller'

const router = Router()

router.route('/:transactionId').get(getOrderedByTransactionId)

export default router
