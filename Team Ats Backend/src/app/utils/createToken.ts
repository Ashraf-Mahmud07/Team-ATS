/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import AppError from "../errors/AppError";

export const createToken = (
	jwtPayload: { id: string; email: string; role: string },
	secret: string | Buffer,
	expiresIn: number 
) => {
	const options: SignOptions = { expiresIn };
	return jwt.sign(jwtPayload, secret as Secret, options);
};
export const verifyToken = (token: string, secret: string | Buffer) => {
  try {
    return jwt.verify(token, secret as Secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
  }
};

