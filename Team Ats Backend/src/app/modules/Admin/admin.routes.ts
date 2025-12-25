import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import AdminControllers from "./admin.controllers";
import AdminValidations from "./admin.validations";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AdminValidations.LoginValidation),
  AdminControllers.loginAdmin,
);

const AdminRoutes = router;

export default AdminRoutes;
