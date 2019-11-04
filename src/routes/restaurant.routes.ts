import { Router } from 'express'

import {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from '../controllers/restaurant.controller'

const router = Router()

router
  .route('/')
  .get(getRestaurants)
  .post(createRestaurant)

router
  .route('/:id')
  .get(getRestaurant)
  .delete(deleteRestaurant)
  .put(updateRestaurant)

export default router
