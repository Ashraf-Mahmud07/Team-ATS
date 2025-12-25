import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AdminServices from "./admin.services";

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const { accessToken, admin } = await AdminServices.loginAdmin(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin logged in successfully!",
    data: { accessToken, admin },
  });
});

const AdminControllers = {
  loginAdmin,
};

export default AdminControllers;
