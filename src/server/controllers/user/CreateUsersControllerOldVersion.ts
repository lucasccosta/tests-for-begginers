import { Request, Response } from "express";
import { UsersModel } from "../../database/sequelize/model/UserModel";

class CreateUsersController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    try {
      const userAlreadyExists = await UsersModel.findOne(email);

      // Buscar no banco de dados se o usuário existe
      if (userAlreadyExists) {
        throw Error("User already exists! Create another one.");
      } else {
        // Validar se o email foi preenchido
        if (email.length == 0) {
          throw new Error("Please insert a valid email");
        }
        // Validar se o name foi preenchido
        else if (name.length == 0) {
          throw new Error("Please insert a valid name");
        }
        // Validar se o password foi preenchido
        else if (password.length < 8) {
          throw new Error(
            "Please insert a password with at least 8 characters"
          );
        }
        // Verficar se o seu nome está presente no password
        else if (password.includes(name)) {
          throw new Error("Password can't contain your name");
        } else {
          const user = await UsersModel.create({ name, email, password });

          return response
            .status(200)
            .json({ message: "User created successfully!", user });
        }
      }
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}

export { CreateUsersController };
