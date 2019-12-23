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

@Table
export default class OrderStatistics extends Model<OrderStatistics> {
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

  @Column
  totalOrder!: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
