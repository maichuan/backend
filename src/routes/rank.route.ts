import { Router } from 'express'
import { getRank, updateRestaurantRank } from '../controllers/rank.controller'

const route = Router()

route
  .route('/')
  .get(getRank)
  .post(updateRestaurantRank)

route.route('/update').get(updateRestaurantRank)

export default route
