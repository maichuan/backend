import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript'
import Restaurants from './Restaurants'
import Users from './Users'
import ConfirmOrders from './ConfirmOrders'

@Table
export default class OrderQueues extends Model<OrderQueues> {
  @ForeignKey(() => Restaurants)
  @Column
  restaurantId!: number

  @ForeignKey(() => Users)
  @Column
  userId!: number

  @ForeignKey(() => ConfirmOrders)
  @Column
  confirmOrderId!: number

  @Column
  seq!: number

  @CreatedAt
  @Column
  createdAt!: Date
}
