import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import Analytics from "@/components/layouts/Analytics";
import About from "@/pages/About";
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
    Component: AdminLayout,
    path: "/admin",
    children: [
      {
        path: "analytics",
        Component: Analytics,
      }
    ],
  },
]);
