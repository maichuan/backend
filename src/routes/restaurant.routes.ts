import { Router } from 'express'

import {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from '../controllers/restaurant.controller'

import { getMenu, postMenu } from '../controllers/menu.controller'

const router = Router()

// Restaurants API
// GET /restaurants
// const body = {
//   restuarants: [
//     {
//       imgURl: 'www.dnvjkdnvjnlmkvkdl.com',
//       name: 'Kong Restaurant',
//       lat: 13,
//       long: 100,
//     },
//     {
//       imgURl: 'www.dnvjkdnvjnlmkvkdl.com',
//       name: 'Kong Restaurant',
//       lat: 13,
//       long: 100,
//     },
//   ],
// }
// POST
// const reqBody = {
//   name: 'Kong',
//   lat: 13,
//   long: 100,
//   imageUrl: 'www.dnvjkdnvjnlmkvkdl.com',
//   address: 'ban kong',
//   phoneno: 0840932489,
//   ownnerId: 1,
// }
// const body = {
//   message: 'success',
// }
router
  .route('/')
  .get(getRestaurants)
  .post(createRestaurant)

router.route('/:id/menus').post(postMenu)
// .get(getMenu)

router
  .route('/:id/:roomId')
  .get()
  .post()

router
  .route('/statistic')
  .get()
  .post()
// Restaurant API
// GET /restaurant
// const body = {
//   restuarant: {
//       imgURl: 'www.dnvjkdnvjnlmkvkdl.com',
//       name: 'Kong Restaurant',
//       lat: 13,
//       long: 100,
//     }
// }
// PUT
// const reqBody = {
//   name: 'Kong',
//   lat: 13,
//   long: 100,
//   imageUrl: 'www.dnvjkdnvjnlmkvkdl.com',
//   address: 'ban kong',
//   phoneno: 0840932489,
//   ownnerId: 1,
// }
// const body = {
//   message: 'success',
// }
// DELETE
// const reqBody = {
// id: 1
// }
// const body = {
//   message: 'success',
// }
router
  .route('/:id')
  .get(getRestaurant)
  .delete(deleteRestaurant)
  .put(updateRestaurant)

export default router
