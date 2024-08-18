import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import AuthMiddleware from "./auth/auth.middleware";
import { store } from "./store";
import { router } from "./router";

export default function App() {
  return (
    <Provider store={store}>
      <AuthMiddleware>
        <RouterProvider router={router} />
      </AuthMiddleware>
    </Provider>
  );
}
