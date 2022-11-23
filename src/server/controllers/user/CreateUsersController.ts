import { Request, Response } from "express";
import { CreateUsers } from "../../useCases/createUsers";

class CreateUsersController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    try {
      const useCase = new CreateUsers();
      const createUsers = await useCase.execute(name, email, password);
      return response
        .status(200)
        .json({ message: "User created successfully!", createUsers });
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}

export { CreateUsersController };
