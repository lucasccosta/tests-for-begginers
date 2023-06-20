import { UsersRepository } from "../repository/user/UsersRepository";

class CreateUsers {
  async execute(name: string, email: string, password: string): Promise<string> {
    const usersRepository = new UsersRepository();
    const userAlreadyExists = await usersRepository.getByEmail(email);
    if (userAlreadyExists) throw new Error("User already exists! Create another one.");

    await usersRepository.create(name, email, password);

    return "User created successfully!"
  }
}

export { CreateUsers };
