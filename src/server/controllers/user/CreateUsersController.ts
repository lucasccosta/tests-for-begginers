import { Request, Response } from "express";
import { CreateUsers } from "../../useCases/CreateUsers";

class CreateUsersController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    try {
      const useCase = new CreateUsers();
      const createUsers = await useCase.execute(name, email, password);
      return response.status(201).send("User created successfully!");
    } catch (error) {
      // @ts-ignore
      return response.status(500).send(error.message);
    }
  }
}

export { CreateUsersController };
