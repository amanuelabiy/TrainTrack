import { Request, Response, NextFunction } from "express";
import { ValidationError, NotFoundError } from "./errors";

export const errorHanlder = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  let statusCode = 5000;
  let errorMessage = "An unknown error has occurred";

  if (error instanceof ValidationError) {
    statusCode = 400;
    errorMessage = error.message;
  } else if (error instanceof NotFoundError) {
    statusCode = 404;
    errorMessage = error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
};

export default errorHanlder;
