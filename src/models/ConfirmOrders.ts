import {
  Table,
  Column,
  Model,
  CreatedAt,
  PrimaryKey,
  AutoIncrement,
  UpdatedAt,
  ForeignKey,
  DataType,
} from 'sequelize-typescript'
import Users from './Users'
import Menus from './Menus'
import Orders from './Orders'
import Restaurants from './Restaurants'

@Table
export default class ConfirmOrders extends Model<ConfirmOrders> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => Users)
  @Column
  userId!: string

  @ForeignKey(() => Menus)
  @Column
  menuId!: number

  @ForeignKey(() => Orders)
  @Column
  orderId!: number

  @ForeignKey(() => Restaurants)
  @Column
  restaurantId!: number

  @Column
  status!: number

  @Column
  details!: string

  @Column
  quantity!: number

  @Column
  token!: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
