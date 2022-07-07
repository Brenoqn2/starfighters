import { Router } from "express";
import { battle, getRanking } from "../controllers/fightersController.js";
import { battleMiddleware } from "../middlewares/fightersMiddlewares.js";

const fightersRouter = Router();
fightersRouter.post("/battle", battleMiddleware, battle);
fightersRouter.get("/ranking", getRanking);

export default fightersRouter;
