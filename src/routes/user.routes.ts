import { Router } from 'express'

import { signUp, findUser } from '../controllers/user.controller'

const router = Router()

router.route('/signup').post(signUp)

router.route('/:id').get(findUser)

export default router
