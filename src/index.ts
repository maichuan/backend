import App from './app'
import { updateRestaurantTrend } from './cron'

const main = async () => {
  const app = new App(3000)
  updateRestaurantTrend()
  await app.listen()
}

main()
