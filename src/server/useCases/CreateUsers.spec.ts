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

  const useCase = new CreateUsers();
  const usersRepository = new UsersRepository();

  it("should create an user", async () => {
    const useCase = new CreateUsers();
    const userDomain = new User("Usuario Teste", "user@teste.com", "12345678");
    const useCaseResponse = await useCase.execute(
      userDomain.name,
      userDomain.email,
      userDomain.password
    );

    const userCreated = await usersRepository.getByEmail("user@teste.com");

    expect(userCreated).toStrictEqual(userDomain);
    expect(useCaseResponse).toBe("User created successfully!")
  });

  it("should return user already exists error", () => {
    expect(async () => {

      const user1 = new User("Usuario Teste 1", "user@teste.com", "12345678");
      await usersRepository.create(user1.name, user1.email, user1.password)
  
      const user2 = new User("Usuario Teste 2", "user@teste.com", "002528528");
      await useCase.execute(
        user2.name,
        user2.email,
        user2.password
      );
      
      await usersRepository.getByEmail("user@teste.com");
    }).rejects.toThrow("User already exists! Create another one.");
  });
});
