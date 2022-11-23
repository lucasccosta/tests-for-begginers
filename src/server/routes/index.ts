import { Router } from "express";

import { CreateUsersController } from "../controllers/user/CreateUsersController";

const createUsersController = new CreateUsersController();

const router = Router();

router.post("/user", createUsersController.handle);

export { router };
