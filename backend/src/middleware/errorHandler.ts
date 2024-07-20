import { type Request, type Response, type NextFunction } from "express";
import { isHttpError } from "http-errors";

export const errorHanlder = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  let statusCode = 500;
  let errorMessage = "An unknown error has occurred";

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
};

export default errorHanlder;
