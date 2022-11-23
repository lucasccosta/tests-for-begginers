import { Sequelize } from "sequelize-typescript";
import { UsersModel } from "../../database/sequelize/model/UserModel";
import { User } from "../../domain/user/User";
import { UsersRepository } from "./UsersRepository";

describe("Users Repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([UsersModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });
  it("creates an user", async () => {
    const user = new User("Usuario 1", "usuario@teste.com", "12345678");

    const usersRepository = new UsersRepository();
    await usersRepository.create(user);

    const userResult = await UsersModel.findOne({
      where: { email: "usuario@teste.com" },
    });

    expect(userResult.toJSON()).toStrictEqual({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  });

  it("finds an user searching by email", async () => {
    const user = new User("Usuario 1", "usuario@teste.com", "12345678");

    const usersRepository = new UsersRepository();
    await usersRepository.create(user);

    const userFound = await usersRepository.getByEmail("usuario@teste.com");

    expect(userFound).toStrictEqual(user);
  });
});
