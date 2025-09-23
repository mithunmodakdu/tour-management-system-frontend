import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter, Navigate } from "react-router";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    
    // element: <App/>
    Component: App,
    path: "/",
    children: [
      {       
        Component: About,
        path: "about",
      }
    ],
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [
      {index: true, element: <Navigate to="/admin/analytics" />},
     ...generateRoutes(adminSidebarItems)
    ]
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      {index: true, element: <Navigate to="/user/bookings" />},
      ...generateRoutes(userSidebarItems)
    ]
  },
  {
    Component: LoginPage,
    path: "/login"
  },
  {
    Component: RegisterPage,
    path: "/register"
  },
  {
    Component: Verify,
    path: "/verify"
  }
]);
