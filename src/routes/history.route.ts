import { Router } from 'express'

import { getHistory } from '../controllers/history.controller'

const router = Router()

router.route('').get(getHistory)

export default router
