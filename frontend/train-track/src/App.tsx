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
  Statistics,
} from "./pages";
import CreateCustomSplitPage from "./pages/CreateCustomSplitPage";

import { workoutsLoader } from "./utils/loaders";
import { todayWorkoutLoader } from "./utils/loaders";
import { workoutHistoryLoader } from "./utils/loaders";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect, useState } from "react";
import { fetchAuthenticatedUser } from "./features/auth/authSlice";
import ProtectedRoute from "./utils/ProtectedRoute";
import { RootState } from "./store";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";
import { setUser } from "./features/auth/authSlice";

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
        path: "statistics",
        element: (
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        ),
        loader: workoutHistoryLoader,
      },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await dispatch(fetchAuthenticatedUser()).unwrap();
        dispatch(setUser(user));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isLoading || status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CookiesProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </CookiesProvider>
    </>
  );
}
export default App;
