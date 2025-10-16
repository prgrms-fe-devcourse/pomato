import { createBrowserRouter } from "react-router";

// pages
import Signup from "@pages/auth/Signup";
import Chart from "@pages/Chart";
import Feed from "@pages/Feed";
import Login from "@pages/Login";
import Mate from "@pages/Mate";
import Notification from "@pages/Notification";
import Setting from "@pages/Setting";

import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "mate",
        Component: Mate,
      },
      {
        path: "feed",
        Component: Feed,
      },
      {
        path: "chart",
        Component: Chart,
      },
      {
        path: "notification",
        Component: Notification,
      },
      {
        path: "setting",
        Component: Setting,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: Signup,
      },
    ],
  },
]);
