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
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import HomePage from "@/pages/HomePage";
import Tours from "@/pages/Tours";
import TourDetails from "@/pages/TourDetails";
import Booking from "@/pages/Booking";
import Success from "@/pages/Payment/Success";
import Failed from "@/pages/Payment/Failed";
import Cancelled from "@/pages/Payment/Cancelled";



export const router = createBrowserRouter([
  {
    
    // element: <App/>
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true
      },
      {
        Component: About,
        path: "about",
      },
      {       
        Component: Tours,
        path: "tours"
      },
      {
        Component: TourDetails,
        path: "tours/:id"
      },
      {
        Component: withAuth(Booking),
        path: "booking/:id"
      }
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
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
  },
  {
    Component: Unauthorized,
    path: "/unauthorized"
  },
  {
    Component: Success,
    path: "/payment/success"
  },
  {
    Component: Failed,
    path: "/payment/failed"
  },
  {
    Component: Cancelled,
    path: "/payment/cancelled"
  },
]);
