import { UsersModel } from "../../database/sequelize/model/UserModel";
import { User } from "../../domain/user/User";

class UsersRepository {
  async create(entity: User) {
    await UsersModel.create({
      name: entity.name,
      email: entity.email,
      password: entity.password,
    });
  }

  async getByEmail(email: string) {
    const user = await UsersModel.findOne({ where: { email } });
    if (!user) throw new Error("User already exists! Create another one.");
    return new User(user.name, user.email, user.password);
  }
}

export { UsersRepository };
