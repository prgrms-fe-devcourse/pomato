import { createBrowserRouter } from "react-router";

import { authLoader } from "@features/auth/model/authLoader";
import Login from "@pages/auth/Login";
import Signup from "@pages/auth/Signup";
import Chart from "@pages/Chart";
import Chat from "@pages/dm/Chat";
import Dm from "@pages/dm/Dm";
import GlobalError from "@pages/error/GlobalError";
import NotFound from "@pages/error/NotFound";
import Feed from "@pages/Feed";
import Mate from "@pages/Mate";
import Notification from "@pages/Notification";
import Setting from "@pages/Setting";

import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <GlobalError />,
    loader: authLoader,
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
        path: "dm",
        Component: Dm,
      },
      {
        path: "dm/:id",
        Component: Chat,
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
  { path: "*", Component: NotFound },
]);
