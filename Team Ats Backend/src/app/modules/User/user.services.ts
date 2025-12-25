/* eslint-disable no-unused-vars */
import { Status, TUser } from "./user.interfaces";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const registerUser = async (user: TUser) => {
  const newUser = await User.create(user);
  return newUser;
};

const changeUserStatus = async (id: string, status: string) => {
  const user = await User.isUserExists(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isStatusValid = Object.values(Status).includes(status as Status);
  if (!isStatusValid) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user status");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!updatedUser) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update user status");
  }

  return updatedUser;
};

const getUser = async (id: string) => {
  const user = await User.isUserExists(id);
  if (!user ) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const getUsers = async (searchQuery: Record<string, unknown>) => {
  const users = await User.find().sort({ createdAt: -1 });
  return users;
};

const updateUser = async (id: string, user: TUser) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user; 
  const updatedUser = await User.findByIdAndUpdate(id, rest, { new: true });

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return updatedUser;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found or already deleted");
  }

  return user;
};

const UserServices = {
  registerUser,
  changeUserStatus,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};

export default UserServices;
