import App from "@/App";
import About from "@/pages/About";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    
    // element: <App/>
    Component: App,
    path: "/",
    children: [
      {
        path: "about",
        Component: About,
      }
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
  }
]);
