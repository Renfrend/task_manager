import { createBrowserRouter } from "react-router-dom";

import LayoutPage from "../layout/layout-page";
import LoginPage from "../pages/login-page/login.page";
import RegisterPage from "../pages/register-page/register.page";
import TasksPage from "../pages/tasks-page/tasks.page";
import PrivateOutlet from "./private.outlet";

const routes = [
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        element: <PrivateOutlet />,
        children: [{ index: true, element: <TasksPage /> }],
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
