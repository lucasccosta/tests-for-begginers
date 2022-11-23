import { UsersModel } from "../../database/sequelize/model/UserModel";
import { User } from "../../domain/user/User";

class UsersRepository {
  async create(entity: User): Promise<void> {
    await UsersModel.create({
      name: entity.name,
      email: entity.email,
      password: entity.password,
    });
  }

  async getByEmail(email: string) {
    const user = await UsersModel.findOne({ where: { email } });
    if (user) {
      return new User(user.name, user.email, user.password);
    }
    return;
  }
}

export { UsersRepository };
