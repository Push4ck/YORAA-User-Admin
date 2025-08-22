import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-0">
        {/* Navbar */}
        <Navbar />

        {/* Scrollable Content with Footer inside */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          <div className="flex-1">
            <Outlet />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
