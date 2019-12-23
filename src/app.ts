import express, { Application } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import IndexRoute from './routes/index.routes'
import RestaurantRoute from './routes/restaurant.routes'
import PaymentRoute from './routes/payment.routes'
import MeRoute from './routes/me.routes'
import MenuRoute from './routes/menu.routes'

import { sequelize } from './database'

export default class App {
  private app: Application

  constructor(private port?: number | string) {
    this.app = express()
    this.settings()
    this.middlewares()
    this.routes()
  }

  public settings() {
    this.app.set('port', this.port || process.env.PORT || 3000)
  }

  public middlewares() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(morgan('dev'))
    this.app.use(express.json())
  }

  public routes() {
    this.app.use(IndexRoute)
    this.app.use('/restaurants', RestaurantRoute)
    this.app.use('/payment', PaymentRoute)
    this.app.use('/me', MeRoute)
    this.app.use('/menu', MenuRoute)
  }

  public async listen() {
    await sequelize.sync()
    await this.app.listen(this.app.get('port'))
    console.log('Server on port', this.app.get('port'))
  }
}
