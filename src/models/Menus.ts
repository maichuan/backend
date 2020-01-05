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
import Restaurants from './Restaurants'

@Table
export default class Menus extends Model<Menus> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => Restaurants)
  @Column
  restaurantId!: number

  @Column
  name!: string

  @Column
  price!: number

  @Column(DataType.TEXT)
  description?: string

  @Column
  status!: number

  @Column(DataType.TEXT)
  question?: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
