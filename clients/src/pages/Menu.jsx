import {
  FaUserCog,
  FaHistory,
  FaHeadset,
  FaSignOutAlt,
  FaBell,
  FaHome,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/user";

function Menu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sky-600 hover:text-sky-700 transition"
        >
          <FaHome size={28} />
        </button>
        <div className="relative">
          <button className="text-sky-600 hover:text-sky-700 transition">
            <FaBell size={28} />
          </button>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-8 px-4">
        <h1 className="text-4xl font-bold text-sky-600 mb-8">Menu</h1>
        <div className="grid grid-cols-1 gap-6 w-full max-w-lg">
          {/* User Settings */}
          <div
            onClick={() => navigate("/settings")}
            className="flex items-center justify-between bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <FaUserCog size={32} className="text-gradient-to-r from-sky-500 to-sky-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">User Settings</h2>
                <p className="text-sm text-gray-500">Manage your account and preferences</p>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div
            onClick={() => navigate("/transactions")}
            className="flex items-center justify-between bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <FaHistory size={32} className="text-gradient-to-r from-indigo-500 to-indigo-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Transaction History</h2>
                <p className="text-sm text-gray-500">View your past transactions</p>
              </div>
            </div>
          </div>

          {/* Support */}
          <div
            onClick={() => navigate("/support")}
            className="flex items-center justify-between bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <FaHeadset size={32} className="text-gradient-to-r from-purple-500 to-purple-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Support</h2>
                <p className="text-sm text-gray-500">Get help and find solutions</p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div
            onClick={handleLogout}
            className="flex items-center justify-between bg-sky-600 p-5 rounded-lg shadow-md hover:shadow-lg hover:bg-sky-700 transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <FaSignOutAlt size={32} className="text-white" />
              <div>
                <h2 className="text-lg font-semibold text-white">Logout</h2>
                <p className="text-sm text-sky-200">Sign out from your account</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-gray-50 mt-auto">
        <p className="text-center text-gray-500 text-sm">
          Need assistance? Visit the <span className="text-sky-600 font-semibold">Support</span> section for help.
        </p>
      </footer>
    </div>
  );
}

export default Menu;

