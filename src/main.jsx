import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page.jsx";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact.jsx";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index.jsx";
const UserProfile = React.lazy(() => import("./routes/UserProfile"));
import ProtectedRoute from "./utils/ProtectedRoutes.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
import AuthProvider from "./utils/AuthContext.jsx";
import NonProtected from "./routes/NonProtected.jsx";
import HocWIthLoaiding from "./hoc/HocWIthLoaiding.jsx";

const AuthLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/non-protected", element: <NonProtected /> },
      { path: "/hoc", element: <HocWIthLoaiding /> },

      {
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            path: "/",
            element: <Root />,
            loader: rootLoader,
            action: rootAction,
            errorElement: <ErrorPage />,
            children: [
              { index: true, element: <Index /> },
              {
                path: "contacts/:contactId",
                element: <Contact />,
                loader: contactLoader,
                action: contactAction,
                errorElement: <ErrorPage />,
              },
              {
                path: "contacts/:contactId/edit",
                action: editAction,
                element: <EditContact />,
                loader: contactLoader,
              },
              {
                path: "contacts/:contactId/destroy",
                action: destroyAction,
              },
            ],
          },
          {
            path: "/user",
            element: (
              <Suspense fallback={<>loading</>}>
                <UserProfile />
              </Suspense>
            ),
          },
          // { path: "*", element: <Navigate to="/" replace /> },
          { path: "*", element: <div> 404 page</div> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
