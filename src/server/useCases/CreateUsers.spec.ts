import { Sequelize } from "sequelize-typescript";
import { UsersModel } from "../database/sequelize/model/UserModel";
import { User } from "../domain/user/User";
import { UsersRepository } from "../repository/user/UsersRepository";
import { CreateUsers } from "./CreateUsers";

describe("use case unit tests", () => {
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
  it("should create an user", async () => {
    const useCase = new CreateUsers();
    const userDomain = new User("Usuario Teste", "user@teste.com", "12345678");
    await useCase.execute(
      userDomain.name,
      userDomain.email,
      userDomain.password
    );

    const usersRepository = new UsersRepository();
    const userCreated = await usersRepository.getByEmail("user@teste.com");

    expect(userCreated).toStrictEqual(userDomain);
  });
});
