import { createBrowserRouter } from "react-router";

// pages
import { getPost } from "@features/feed/api/post";
import Login from "@pages/auth/Login";
import Signup from "@pages/auth/Signup";
import Chart from "@pages/Chart";
import Dm from "@pages/Dm";
import Feed from "@pages/Feed";
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
        loader: async () => {
          return await getPost();
        },
      },
      {
        path: "chart",
        Component: Chart,
      },
      {
        path: "dm",
        Component: Dm,
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
