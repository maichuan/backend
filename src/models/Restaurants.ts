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

  @Column
  vat!: number

  @Column
  serviceCharge!: number

  @Column
  numberOfTable!: number

  @ForeignKey(() => Users)
  @Column
  ownerId!: number

  @Column
  imgURL!: string

  @Column(DataType.DECIMAL(9, 6))
  lat!: number

  @Column(DataType.DECIMAL(9, 6))
  long!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
