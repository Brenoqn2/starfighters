import { Request, Response } from "express";
import * as figthersServices from "../services/fightersServices.js";

async function battle(req: Request, res: Response) {
  const { firstUser, secondUser } = req.body;
  const result = await figthersServices.battle(firstUser, secondUser);
  res.send(result);
}

export { battle };