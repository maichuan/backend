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

@Table
export default class ConfirmOrders extends Model<ConfirmOrders> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @ForeignKey(() => Users)
  @Column
  uid!: string

  @ForeignKey(() => Menus)
  @Column
  menuId!: number

  @Column
  status!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
