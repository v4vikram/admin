import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { isTokenValid } from "../utils/auth";
import { logout } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";


const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("userAuthToken");
      // console.log("token", token);
      if (token && !isTokenValid(token)) {
        dispatch(logout());
        toast.info("Session expired. Please login again.");
        Navigate("/login");
      }
    }, 3600); // check every 1 hour

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex min-h-screen ">
        <div className={`sidebar bg-secondary-gray border border-border-gray global-t ${isSidebarOpen ? 'w-64 px-2' : 'w-0 px-0'}`}>
          <Sidebar />
        </div>
        <div className="flex-1">
          <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="p-6 min-h-screen bg-main-gray flex-1 overflow-y-auto">
            <Outlet/>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
