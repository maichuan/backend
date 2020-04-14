import App from './app'
import { updateRestaurantTrend } from './cron'
import { updateRank } from './cron/ranking'

const main = async () => {
  const app = new App(3000)
  // updateRestaurantTrend()
  updateRank()
  await app.listen()
}

main()
