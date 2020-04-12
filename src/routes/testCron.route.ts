import { Router } from 'express'
import { testUpdateRank, getRank } from '../cron/ranking'

const route = Router()

route.route('/').get(getRank)

export default route
