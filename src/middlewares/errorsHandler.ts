import { ErrorRequestHandler } from "express";

const errorsHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.type === "error_missing_fighter")
    return res.status(422).send({ message: err.message });
  if (err.type === "error_notGitHubUser")
    return res.status(404).send({ message: err.message });
  console.log(err);
  res.status(500).send("Something broke!");

  next(err);
};

export default errorsHandler;
