import {
  FaUserCog,
  FaHistory,
  FaHeadset,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
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
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Menu</h1>

      {/* Menu Options */}
      <div className="w-full max-w-md space-y-5">
        {/* User Settings */}
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-all"
        >
          <div className="flex items-center space-x-3">
            <FaUserCog size={24} className="text-yellow-500" />
            <span className="font-semibold text-yellow-300">User Settings</span>
          </div>
          <FaChevronRight size={20} className="text-yellow-500" />
        </button>

        {/* Transaction History */}
        <button
          onClick={() => navigate("/transactions")}
          className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-all"
        >
          <div className="flex items-center space-x-3">
            <FaHistory size={24} className="text-yellow-500" />
            <span className="font-semibold text-yellow-300">Transaction History</span>
          </div>
          <FaChevronRight size={20} className="text-yellow-500" />
        </button>

        {/* Support */}
        <button
          onClick={() => navigate("/support")}
          className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-all"
        >
          <div className="flex items-center space-x-3">
            <FaHeadset size={24} className="text-yellow-500" />
            <span className="font-semibold text-yellow-300">Support</span>
          </div>
          <FaChevronRight size={20} className="text-yellow-500" />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-between bg-red-500 p-4 rounded-lg shadow-md hover:bg-red-600 transition-all"
        >
          <div className="flex items-center space-x-3">
            <FaSignOutAlt size={24} className="text-gray-900" />
            <span className="font-semibold text-gray-900">Logout</span>
          </div>
          <FaChevronRight size={20} className="text-gray-900" />
        </button>
      </div>

      {/* NavBar */}
      <NavBar />

      {/* Footer */}
      <div className="mt-6 w-full text-center">
        <p className="text-yellow-300 text-sm">
          Need assistance? Visit the Support section for help.
        </p>
      </div>
    </div>
  );
}

export default Menu;

