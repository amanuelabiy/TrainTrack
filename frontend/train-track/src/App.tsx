import "react-toastify/dist/ReactToastify.css";
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

import { loader as workoutsLoader } from "./pages/CreateCustomSplitPage";
import { loader as todayWorkoutLoader } from "./pages/Today";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect } from "react";
import { fetchAuthenticatedUser } from "./features/auth/authSlice";
import ProtectedRoute from "./utils/ProtectedRoute";
import { RootState } from "./store";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Today />
          </ProtectedRoute>
        ),
        loader: todayWorkoutLoader,
      },
      {
        path: "history",
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "mysplit",
        element: (
          <ProtectedRoute>
            <MySplit />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "create-custom-split",
            element: (
              <ProtectedRoute>
                <CreateCustomSplitPage />
              </ProtectedRoute>
            ),
            loader: workoutsLoader,
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "upcoming",
        element: (
          <ProtectedRoute>
            <Upcoming />
          </ProtectedRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();

  const { user, status } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchAuthenticatedUser());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
export default App;
