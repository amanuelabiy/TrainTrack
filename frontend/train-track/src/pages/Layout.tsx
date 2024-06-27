import { Outlet, useLocation } from "react-router-dom";
import MobileDropdown from "@/components/navbar/MobileDropdown";
import Navbar from "@/components/navbar/Navbar";

function Layout() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "register"];

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative flex bg-primary-foreground shadow-lg rounded-lg w-95vw md:w-4/5 lg:w-4/5 xl:w-4/5 h-95vh max-h-screen p-6 overflow-hidden">
        {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
        <div className="lg:hidden absolute top-4 right-4">
          <MobileDropdown />
        </div>
      </div>
    </div>
  );
}

export default Layout;
