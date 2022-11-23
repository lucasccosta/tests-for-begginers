import {
  Table,
  Column,
  PrimaryKey,
  Model,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: false,
})
class UsersModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare email: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare password: string;
}

export { UsersModel };
