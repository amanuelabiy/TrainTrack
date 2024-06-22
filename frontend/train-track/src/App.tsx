import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Layout,
  History,
  Login,
  MySplit,
  Register,
  Settings,
  Today,
  Upcoming,
} from "./pages";

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
    ],
  },
]);

function App() {
  return (
    <div>
      <h1 className="text-7xl font-bold ">App</h1>
    </div>
  );
}
export default App;
