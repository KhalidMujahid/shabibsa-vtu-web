import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavBar";
import {
  FaMobileAlt,
  FaCreditCard,
  FaWifi,
  FaBolt,
  FaPaperPlane,
  FaSms,
  FaEllipsisH,
  FaEye,
  FaEyeSlash,
  FaBell,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, transactions, loading, error } = useSelector((state) => state.user);
  const [notifications] = useState([
    "Transaction Successful",
    "New Feature: Bulk SMS Service",
    "Scheduled Maintenance on Sunday",
  ]);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred while loading the page.");
    }
  }, [error]);

  const balance = user?.balance || 0;

  return (
    <div className="min-h-screen bg-gray-900 text-yellow-400 flex flex-col">
      <ToastContainer />
      {loading && <div className="loading-overlay"><div className="spinner"></div></div>}

      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 bg-yellow-500 text-gray-900 shadow-lg">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="relative">
          <FaBell
            size={24}
            className="cursor-pointer hover:text-yellow-700 transition-colors"
            onClick={() => alert("Viewing all notifications")}
          />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
              {notifications.length}
            </span>
          )}
        </div>
      </header>

      {/* Balance Card */}
      <div className="mt-6 mx-auto w-11/12 max-w-lg bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-yellow-500/50 transition-shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{user?.firstname} {user?.lastname}</h2>
            <p className="text-sm text-gray-400">@{user?.username}</p>
          </div>
          <button
            className="text-yellow-400 hover:text-yellow-500"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-light text-gray-400">Total Balance</h3>
          <p className="text-4xl font-bold">{showBalance ? `₦${balance.toLocaleString()}` : "****"}</p>
        </div>
        <div className="mt-4 bg-gray-700 h-2 rounded-full overflow-hidden">
          <div
            className="bg-yellow-500 h-2"
            style={{ width: `${(balance / 1000000) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 mt-2">{balance} of ₦1,000,000 saved</p>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-3 gap-4 w-11/12 max-w-lg mx-auto">
        {[
          { icon: <FaCreditCard />, label: "Fund", bg: "bg-yellow-500", link: "/fundwallet" },
          { icon: <FaMobileAlt />, label: "Airtime", bg: "bg-gray-700", link: "/buyairtime" },
          { icon: <FaWifi />, label: "Data", bg: "bg-yellow-600", link: "/buydata" },
          { icon: <FaBolt />, label: "Electricity", bg: "bg-gray-800", link: "/bills" },
          { icon: <FaPaperPlane />, label: "Transfer", bg: "bg-gray-700", link: "/transfer" },
          { icon: <FaSms />, label: "Bulk SMS", bg: "bg-yellow-700", link: "/bluksms" },
          { icon: <FaEllipsisH />, label: "More", bg: "bg-gray-600", link: "/more" },
        ].map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.link)}
            className={`flex flex-col items-center justify-center ${action.bg} text-gray-900 p-3 rounded-lg shadow-md hover:scale-105 transition-transform`}
          >
            {action.icon}
            <span className="text-xs mt-1">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="mt-10 w-11/12 max-w-lg mx-auto bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        {loading ? (
          <p className="text-gray-400 mt-4">Loading transactions...</p>
        ) : transactions?.length ? (
          <ul className="mt-4 space-y-2">
            {transactions.map((tx, index) => (
              <li key={index} className="text-sm text-yellow-400">
                {tx.description} - ₦{tx.amount.toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 mt-4">No transactions found.</p>
        )}
      </div>

      <NavBar />
    </div>
  );
}

export default Dashboard;

