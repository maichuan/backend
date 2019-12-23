import {
  Table,
  Column,
  Model,
  CreatedAt,
  PrimaryKey,
  DataType,
  AutoIncrement,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript'
import Users from './Users'

@Table
export default class Restaurants extends Model<Restaurants> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  name!: string

  @Column(DataType.TEXT)
  address!: string

  @Column
  phoneno!: string

  @ForeignKey(() => Users)
  @Column
  ownerId!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
