import { Router } from 'express'
import { getRank, updateRestaurantRank } from '../controllers/rank.controller'

const route = Router()

route
  .route('/')
  .get(getRank)
  .post(updateRestaurantRank)

export default route
