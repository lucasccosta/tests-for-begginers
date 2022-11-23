import { User } from "./User";

describe("user domain unit tests", () => {
  it("should throw error when name is empty", () => {
    expect(() => {
      let user1 = new User("", "teste@xmail.com", "lalala1234");
    }).toThrowError("Please insert a valid name");
  });

  it("should throw error when email is empty", () => {
    expect(() => {
      let user = new User("Userzin", "", "lalala1234");
    }).toThrowError("Please insert a valid email");
  });

  it("should throw error when password is empty", () => {
    expect(() => {
      let user = new User("Userzin", "teste@xmail.com", "1234");
    }).toThrowError("Please insert a password with at least 8 characters");
  });
  it("should throw error when password contain name", () => {
    expect(() => {
      let user = new User("Userzin", "teste@xmail.com", "Userzin1223");
    }).toThrowError("Password can't contain your name");
  });

  // Adicionais, apenas para mostrar como são testes unitários de comportamento
  it("should change user's email", () => {
    let user = new User("Userzin", "teste@xmail.com", "12345678");
    user.changeEmail("user@teste.com");
    expect(user.email).toBe("user@teste.com");
  });

  it("should change user's password", () => {
    let user = new User("Userzin", "teste@xmail.com", "12345678");
    user.changePassword("aDecentpass4w0rd");
    expect(user.password).toBe("aDecentpass4w0rd");
  });
});
