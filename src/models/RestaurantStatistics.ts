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
import Users from './Users'
import Restaurants from './Restaurants'

@Table
export default class RestaurantStatistics extends Model<RestaurantStatistics> {
  @PrimaryKey
  @Column
  @AutoIncrement
  id!: number

  @ForeignKey(() => Users)
  @Column
  uid!: string

  @ForeignKey(() => Restaurants)
  @Column
  resId!: string

  @CreatedAt
  @Column
  creatAt!: Date
}
