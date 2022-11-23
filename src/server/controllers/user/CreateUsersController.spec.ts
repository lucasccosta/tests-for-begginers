import { testServer } from "../../../../testConfig/jest.setup";
import { Sequelize } from "sequelize-typescript";
import { UsersModel } from "../../database/sequelize/model/UserModel";

describe("Create Users Controller unit tests", () => {
  describe("#create", () => {
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
      const user = {
        name: "test",
        email: "fast@xmail.com",
        password: "next1029932",
      };
      const response = await testServer.post("/user").send(user);

      expect(response.status).toEqual(200);
      expect(response.text).toBe("User created successfully!");
    });

    it("should throw an error about insert valid name", async () => {
      const user = {
        name: "",
        email: "test@xmail.com",
        password: "test1234456",
      };
      const response = await testServer.post("/user").send(user);

      expect(response.status).toBe(500);
      expect(response.text).toBe("Please insert a valid name");
    });
    it("should throw an error about insert valid email", async () => {
      const user = {
        name: "user test",
        email: "",
        password: "test1234456",
      };
      const response = await testServer.post("/user").send(user);

      expect(response.status).toBe(500);
      expect(response.text).toBe("Please insert a valid email");
    });

    it("should throw an error about password contain at least 8 characters", async () => {
      const user = {
        name: "test",
        email: "test@xmail.com",
        password: "las",
      };
      const response = await testServer.post("/user").send(user);

      expect(response.status).toBe(500);
      expect(response.text).toBe(
        "Please insert a password with at least 8 characters"
      );
    });

    it("should throw an error about password cannot contain name in it", async () => {
      const user = {
        name: "test",
        email: "test@xmail.com",
        password: "test1234456",
      };
      const response = await testServer.post("/user").send(user);

      expect(response.status).toBe(500);
      expect(response.text).toBe("Password can't contain your name");
    });
  });
});
