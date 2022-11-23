import { User } from "../domain/user/User";
import { UsersRepository } from "../repository/user/UsersRepository";

class CreateUsers {
  async execute(name: string, email: string, password: string) {
    const usersRepository = new UsersRepository();
    const userAlreadyExists = await usersRepository.getByEmail(email);
    if (userAlreadyExists)
      throw new Error("User already exists! Create another one.");

    const user = new User(name, email, password);
    await usersRepository.create(user);
  }
}

export { CreateUsers };
