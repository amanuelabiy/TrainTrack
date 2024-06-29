import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import {
  Layout,
  History,
  Login,
  MySplit,
  Register,
  Settings,
  Today,
  Upcoming,
  Statistics,
} from "./pages";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Today />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "mysplit",
        element: <MySplit />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "upcoming",
        element: <Upcoming />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
    ],
  },
]);

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}
export default App;
