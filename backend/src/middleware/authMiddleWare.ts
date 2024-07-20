import { type Request, type Response, type NextFunction } from "express";
import createHttpError from "http-errors";

const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return next(createHttpError(401, "User not authenticated"));
  }

  next();
};

export default authMiddleWare;
