import {
  Table,
  Column,
  Model,
  CreatedAt,
  PrimaryKey,
  DataType,
  AutoIncrement,
} from 'sequelize-typescript'

@Table
export default class Restaurants extends Model<Restaurants> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  title!: string

  @Column(DataType.TEXT)
  description!: string

  @Column
  imgUrl!: string

  @CreatedAt
  @Column
  createdAt!: Date
}
