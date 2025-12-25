import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Auth/Login/Login";
import AboutUs from "../pages/Auth/AboutUs/AboutUs";
import UserProfile from "../pages/Auth/UserProfile/UserProfile";
import ContactForm from "../pages/Auth/Contact/Contact";
import ActivitiesPage from "../pages/Auth/Activities/Activities";
import ActivityDetail from "../pages/Auth/ActivityDetail/ActivityDetail";
import NoticePage from "../pages/Auth/Notice/Notice"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/profile", element: <UserProfile /> },
      { path: "/contact", element: <ContactForm /> },
      { path: "/activities", element: <ActivitiesPage /> },
      { path: "/activities/:id", element: <ActivityDetail /> },
      { path: "/notice", element: <NoticePage /> },
    ],
  },
]);
