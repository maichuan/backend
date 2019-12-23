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

@Table
export default class Transactions extends Model<Transactions> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  totalPrice!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
