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

@Table
export default class QrCodes extends Model<QrCodes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => Restaurants)
  @Column
  restaurantId!: number

  @Column
  imgUrl!: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
