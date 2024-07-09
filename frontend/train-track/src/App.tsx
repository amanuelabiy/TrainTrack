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
  Statistics,
} from "./pages";
import CreateCustomSplitPage from "./pages/CreateCustomSplitPage";

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
        path: "mysplit/create-custom-split",
        element: <CreateCustomSplitPage />,
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
  return <RouterProvider router={router} />;
}
export default App;
