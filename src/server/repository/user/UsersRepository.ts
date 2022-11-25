import { UsersModel } from "../../database/sequelize/model/UserModel";
import { User } from "../../domain/user/User";

class UsersRepository {
  async create(name: string, email: string, password: string): Promise<void> {
    const user = new User(name, email, password);
    await UsersModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
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
