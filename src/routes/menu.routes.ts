import { Router } from 'express'
import { getMenu, postMenu } from '../controllers/menu.controller'
const router = Router()

// getMenu API (only owner of restaurant)
// const body = [{
//   menu: 'padthai',
//   price: 40,
//   info: '' || null,
//   imgURL: 'www.fdfdf.com'
// }, {...}]

// postMenu API
// const reqBody = {
//   menu: 'kapow',
//   price: 15,
//   info: '' || null,
//   imgURL: 'www.image.com'
// }

router.route('/').post(postMenu)

router.route('/:id').get(getMenu)

export default router
