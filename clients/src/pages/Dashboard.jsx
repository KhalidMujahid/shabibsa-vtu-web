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
import { DocumentTextIcon } from "@heroicons/react/outline";

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
    <div className="min-h-screen bg-white text-blue-900 flex flex-col">
      <ToastContainer />
      {loading && <div className="loading-overlay"><div className="spinner"></div></div>}

      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 bg-blue-600 text-white shadow-lg">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="relative">
          <FaBell
            size={24}
            className="cursor-pointer hover:text-blue-300 transition-colors"
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
      <div className="mt-6 mx-auto w-11/12 max-w-lg bg-white p-6 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{user?.firstname} {user?.lastname}</h2>
            <p className="text-sm text-gray-600">@{user?.username}</p>
          </div>
          <button
            className="text-blue-600 hover:text-blue-500"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-light text-gray-600">Total Balance</h3>
          <p className="text-4xl font-bold">{showBalance ? `₦${balance.toLocaleString()}` : "****"}</p>
        </div>
        <div className="mt-4 bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-2"
            style={{ width: `${(balance / 1000000) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-2">{balance} of ₦1,000,000 saved</p>
      </div>
      

      {/* Quick Actions */}
<div className="mt-8 grid grid-cols-3 gap-6 w-11/12 max-w-lg mx-auto">
  {[
    { icon: <FaCreditCard />, label: "Fund", bg: "bg-gray-300", link: "/fundwallet" },
    { icon: <FaMobileAlt />, label: "Airtime", bg: "bg-gray-300", link: "/buyairtime" },
    { icon: <FaWifi />, label: "Data", bg: "bg-gray-300", link: "/buydata" },
    { icon: <FaBolt />, label: "Electricity", bg: "bg-gray-300", link: "/bills" },
    { icon: <FaPaperPlane />, label: "Transfer", bg: "bg-gray-300", link: "/transfer" },
    { icon: <DocumentTextIcon />, label: "Result Checker", bg: "bg-gray-300", link: "/exams" },
    { icon: <FaEllipsisH />, label: "More", bg: "bg-gray-300", link: "/more" },
  ].map((action, index) => (
    <button
      key={index}
      onClick={() => navigate(action.link)}
      className={`flex flex-col items-center justify-center h-24 w-24 ${action.bg} text-blue-900 p-4 rounded-lg shadow-md hover:scale-105 transition-transform`}
    >
      {action.icon}
      <span className="text-xs mt-2">{action.label}</span>
    </button>
  ))}
</div>


      {/* Recent Transactions */}
      <div className="mt-10 w-11/12 max-w-lg mx-auto bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-blue-600">Recent Transactions</h2>
        {loading ? (
          <p className="text-gray-600 mt-4">Loading transactions...</p>
        ) : transactions?.length ? (
          <ul className="mt-4 space-y-2">
            {transactions.map((tx, index) => (
              <li key={index} className="text-sm text-blue-600">
                {tx.description} - ₦{tx.amount.toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-4">No transactions found.</p>
        )}
      </div>

      <NavBar />
    </div>
  );
}

export default Dashboard;

