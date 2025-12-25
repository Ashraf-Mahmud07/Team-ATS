import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { createToken } from "../../utils/createToken";
import { Admin } from "./admin.model";

const loginAdmin = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  // check if the admin is exist
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You have no access to the system! Please contact to the authority.",
    );
  }

  const isPasswordMatch = await Admin.isPasswordMatched(
    password,
    admin.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Wrong password! Please try again.",
    );
  }

  const jwtPayload = {
    id: admin?._id.toString(),
    email: admin?.email,
    role: admin?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret,
    config.jwt_expiration,
  );
  const adminWithoutPassword = await Admin.findById(admin._id);

  return { accessToken, admin: adminWithoutPassword };
};

const AdminServices = {
  loginAdmin,
};

export default AdminServices;
