import { Router } from 'express'

import {
  signUp,
  findUser,
  createRestaurantOwner,
} from '../controllers/user.controller'

const router = Router()

router.route('/signup').post(signUp)

router.route('/:id').get(findUser)

router.route('/owner').post(createRestaurantOwner)

export default router
