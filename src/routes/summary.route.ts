import { Router } from 'express'
import {
  getIncomeById,
  getMenuEachDay,
} from '../controllers/restaurant.controller'

const router = Router()

router.route('/:id').get(getIncomeById)

router.route('/:id/:date').get(getMenuEachDay)

export default router
