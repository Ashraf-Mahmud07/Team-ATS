/* eslint-disable no-unused-vars */
import { Model, ObjectId } from "mongoose";

export enum Status {
  Active = "active",
  Blocked = "blocked",
}

export type TPicture = {
  url: string;
  publicId: string;
};

export type TExamAttempted = {
  examId: string;
  score: number;
  attemptDate: Date;
};

export enum Packages {
  Free = "free",
  Trial = "trial",
  Paid = "paid",
}

export interface TUser {
  _id?: string
  name: string;
  email: string;
  phone?: string;
  password: string;
  isVerified?: boolean;
  presentAddress?: string;
  permanentAddress?: string;
  profession?: string;
  bloodGroup?: string;
  facebook: { type: String, default: "" }, 
  picture?: TPicture;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
  isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>;
  findUserByEmail(email: string): Promise<TUser | null>;
}
