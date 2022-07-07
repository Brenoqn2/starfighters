import { Request, Response, NextFunction } from "express";

async function battleMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstUser, secondUser } = req.body;
  if (!firstUser || !secondUser) {
    throw { type: "error_missing_fighter", message: "Missing fighter name" };
  }
  next();
}

export { battleMiddleware };
