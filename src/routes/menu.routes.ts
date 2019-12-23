import { Router } from 'express'
import { getMenu, postMenu } from '../controllers/menu.controller'
const router = Router()

router
  .route('/:id')
  .get(getMenu)
  .post(postMenu)

export default router
