import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";

function Layout() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "register"];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-primary-foreground shadow-lg rounded-lg w-95vw md:w-4/5 lg:w-4/5 xl:w-4/5 h-95vh max-h-screen p-6 overflow-hidden">
        {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
        <div className="flex-1 overflow-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
