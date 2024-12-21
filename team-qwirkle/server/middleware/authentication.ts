import { NextFunction, Request, Response } from "express";
import { SessionData } from "express-session";
const authenticationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (!request.session) {
    response.redirect("/auth/login");
  } else {
    response.locals.user = request.session.user;
    next();
  }
};
export default authenticationMiddleware;
