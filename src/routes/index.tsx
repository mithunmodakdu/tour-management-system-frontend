import App from "@/App";
import About from "@/pages/about";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <App/>
    Component: App,
    children: [
      {
        path: "about",
        Component: About
      }
    ]
  }
]);