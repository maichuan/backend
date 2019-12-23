import {
  Table,
  Column,
  Model,
  CreatedAt,
  PrimaryKey,
  AutoIncrement,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript'
import Restaurants from './Restaurants'
import Menus from './Menus'
import Users from './Users'
import Transactions from './Transactions'

@Table
export default class Orders extends Model<Orders> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => Restaurants)
  @Column
  restaurantId!: number

  @ForeignKey(() => Menus)
  @Column
  menuId?: number

  @ForeignKey(() => Users)
  @Column
  userId!: number

  @ForeignKey(() => Transactions)
  @Column
  transactionId!: number

  @Column
  amount!: number

  @Column
  price!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
