import { createBrowserRouter, Navigate } from "react-router";

import { authLoader } from "@features/auth/model/authLoader";
import { messageLoader } from "@features/dm/model/loader";
import { listPosts } from "@features/feed/api/post";
import type { Post } from "@features/feed/types/feed.types";
import { mateLoader } from "@features/user/model/loader";
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
        index: true,
        element: <Navigate to="mate" replace />,
      },
      {
        path: "mate",
        Component: Mate,
        loader: mateLoader,
      },
      {
        path: "feed",
        Component: Feed,
        loader: async () => {
          const posts: Post[] = await listPosts();
          return posts;
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
        path: "dm/:id",
        Component: Chat,
        loader: messageLoader,
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
