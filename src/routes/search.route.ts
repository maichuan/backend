import { Router } from 'express'
import { getSearch, getWord } from '../controllers/search.controller'

const router = Router()

router
  .route('/')
  .get(getSearch)
  .post(getSearch)

export default router
