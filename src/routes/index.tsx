import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Admin/Analytics";
import Bookings from "@/pages/User/Bookings";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";
import AddTour from "@/pages/Admin/AddTour";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";

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
     ...generateRoutes(adminSidebarItems)
    ]
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      {
        Component: Bookings,
        path: "bookings"
      }
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
