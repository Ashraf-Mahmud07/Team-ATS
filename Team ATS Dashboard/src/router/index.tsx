import ProtectedLayout from "@/layouts/ProtectedLayout";
import Login from "@/pages/Login";
// import QuestionList from "@/pages/Questions/QuestionsList";
import AdminList from "@/pages/Admins/AdminList";

import UserList from "@/pages/UserList";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedLayout>
        <Layout />
      </ProtectedLayout>
    ),
    children: [
      { path: "/", element: <AdminList /> },
      { path: "users", element: <UserList /> },
    ],
  },
]);

export default router;
