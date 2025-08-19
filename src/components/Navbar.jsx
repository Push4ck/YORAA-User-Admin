import { LogOut, KeyRound } from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 shadow-sm border-b border-gray-200">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
        Dashboard
      </h2>

      {/* Right Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Date */}
        <span className="text-sm text-gray-500 hidden sm:inline">
          Oct 11, 2023
        </span>

        {/* Change Password */}
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition">
          <KeyRound size={16} />
          <span className="hidden sm:inline">Change Password</span>
        </button>

        {/* Logout */}
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition">
          <LogOut size={16} />
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
