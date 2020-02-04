import {
  Table,
  Column,
  Model,
  CreatedAt,
  PrimaryKey,
  AutoIncrement,
  UpdatedAt,
} from 'sequelize-typescript'
import { Col } from 'sequelize/types/lib/utils'

@Table
export default class Users extends Model<Users> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  uid!: string

  @CreatedAt
  createdAt!: Date

  @UpdatedAt
  updatedAt!: Date
}
