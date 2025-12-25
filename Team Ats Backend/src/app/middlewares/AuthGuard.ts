import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { Admin } from "../modules/Admin/admin.model";
import { User } from "../modules/User/user.model";
import { Status, TUser } from "../modules/User/user.interfaces"
import { TAdmin } from "../modules/Admin/admin.interface";
import catchAsync from "../utils/catchAsync";


declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
      interface Request {
        userData?: TUser | TAdmin;
      }
    }
  }
  
const AuthGuard = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Authorization token is missing!");
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;
    } catch {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token!");
    }

    const { id, email, role } = decoded;

    let user: TUser | null = null;

    switch (role) {
      case "user":
        user = await User.findOne({ _id: id, email });
        if (user?.status !== Status.Active) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Your account is not active!");
        }
        break;
      case "admin":
        user = await Admin.findOne({ _id: id, email });
        break;
      default:
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid role!");
    }

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User not found!");
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, "Access denied!");
    }

    req.userData = user;
    next();
  });
};

export default AuthGuard;
