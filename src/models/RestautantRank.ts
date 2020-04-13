import {
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  Table,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript'

import Restaurants from './Restaurants'
@Table
export default class RestaurantRank extends Model<RestaurantRank> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => Restaurants)
  @Column
  resId!: number

  @Column
  score!: number

  @CreatedAt
  @Column
  //   @Column({
  //     type: DataType.DATEONLY,
  //   })
  createdAt!: Date

  @UpdatedAt
  @Column
  //   @Column({
  //     type: DataType.DATEONLY,
  //   })
  updatedAt!: Date
}
