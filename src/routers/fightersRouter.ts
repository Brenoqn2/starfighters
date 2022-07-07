import { Router } from "express";
import { battle } from "../controllers/fightersController.js";
import { battleMiddleware } from "../middlewares/fightersMiddlewares.js";

const fightersRouter = Router();
fightersRouter.post("/battle", battleMiddleware, battle);

export default fightersRouter;
