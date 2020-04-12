import { Router } from 'express'

import {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
  postStat,
  getStat,
} from '../controllers/restaurant.controller'

import { getMenu, postMenu } from '../controllers/menu.controller'

const router = Router()

router
  .route('/')
  .get(getRestaurants)
  .post(createRestaurant)

router.route('/:id/menus').post(postMenu)

router
  .route('/:id/:roomId')
  .get()
  .post()

router
  .route('/statistic')
  .get(getStat)
  .post(postStat)

router
  .route('/:id')
  .get(getRestaurant)
  .delete(deleteRestaurant)
  .put(updateRestaurant)

export default router
