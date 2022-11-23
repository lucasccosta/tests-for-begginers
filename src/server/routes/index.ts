import { Router } from "express";

import { LocationsController } from "../controllers/user/LocationsController";

const locationsController = new LocationsController();

const router = Router();

router.get("/location", locationsController.getDistances);

export { router };
