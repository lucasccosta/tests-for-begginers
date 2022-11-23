import { Table, Column, PrimaryKey, Model } from "sequelize-typescript";
import { v4 as uuid } from "uuid";

@Table({
  tableName: "users",
  timestamps: false,
})
class UsersModel extends Model {
  constructor() {
    super();
    if (!this.id) {
      this.id = uuid();
    }
  }

  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare email: string;

  @Column({ allowNull: false })
  declare password: string;
}

export { UsersModel };
