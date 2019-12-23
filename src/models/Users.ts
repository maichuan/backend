import {
  Table,
  Column,
  Model,
  CreatedAt,
  PrimaryKey,
  AutoIncrement,
  UpdatedAt,
} from 'sequelize-typescript'

@Table
export default class Users extends Model<Users> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  email!: string

  @Column
  password!: string

  @Column
  username!: string

  @Column
  gmailToken?: string

  @Column
  facebookToken?: string

  @Column
  role?: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
