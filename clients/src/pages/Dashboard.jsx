import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "../components/Carousel";
import shabibsadata from "../assets/logo.png";
import {
  AiOutlineMenu,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import {
  FaMobileAlt,
  FaCreditCard,
  FaWifi,
  FaBolt,
  FaPaperPlane,
  FaTv,
  FaFileAlt,
  FaMoneyBillWave,
  FaComments,
  FaShareAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, toggleLog } from "../redux/user";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, balance, notif } = useSelector((state) => state.user);
  const [showBalance, setShowBalance] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Error loading user data!");
    }
  }, [user]);

  const toggleBalance = () => setShowBalance(!showBalance);

  const handleNavigate = (path) => navigate(path);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      const parsedUser = JSON.parse(user);
      dispatch(loadUser({ user: parsedUser, token }));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Dashboard",
          url: window.location.href,
        })
        .then(() => toast.success("Shared link copied successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      toast.info("Share functionality is not supported on this device.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <ToastContainer />

      {/* Header */}
      <header className="w-full bg-white shadow-lg p-4 flex justify-between items-center rounded-2xl">
        <button
          onClick={() => handleNavigate("/menu")}
          className="flex items-center justify-center bg-blue-50 p-3 rounded-full hover:bg-blue-200 transition-all duration-300 ease-in-out"
        >
          <AiOutlineMenu size={24} className="text-blue-600 cursor-pointer" />
        </button>

        <h1 className="text-xl font-semibold text-blue-800 flex items-center justify-center flex-grow tracking-tight">
          Dashboard
        </h1>

        <div className="relative flex items-center justify-center ml-4 p-2 bg-blue-50 rounded-full shadow-md">
          <img src={shabibsadata} alt="Shabibsa Data" className="h-10 md:h-12 object-contain rounded-full" />
        </div>
      </header>

      {/* Welcome Modal */}
      {notif && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              Welcome, {user?.firstname || user.user?.firstname}!
            </h2>
            <p className="text-gray-600 mb-6">
              All services are going smoothly like speed of light. Please if
              you have any issues, visit our support. <br />{" "}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => dispatch(toggleLog(false))}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  dispatch(toggleLog(false));
                  handleNavigate("/support");
                }}
              >
                Visit Support
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">
                {user.user?.firstname || user?.firstname}{" "}
                {user.user?.lastname || user?.lastname}
              </h2>
              <p className="text-sm text-gray-500">
                @{user?.username || user.user?.username}
              </p>
            </div>
            <button
              onClick={toggleBalance}
              className="text-blue-600 hover:text-blue-700"
              aria-label="Toggle Balance Visibility"
            >
              {showBalance ? (
                <AiOutlineEyeInvisible size={24} />
              ) : (
                <AiOutlineEye size={24} />
              )}
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-sm text-gray-500">Available Balance</h3>
            <p className="text-3xl font-bold">
              {showBalance
                ? `₦${balance.toLocaleString() || user.balance.toLocaleString()}`
                : "****"}
            </p>
          </div>
        </div>

        <Carousel user={user} />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { icon: <FaMobileAlt size={24} />, label: "Airtime", bg: "bg-gray-300", link: "/buyairtime" },
            { icon: <FaWifi size={24} />, label: "Data", bg: "bg-gray-300", link: "/buydata" },
            { icon: <FaCreditCard size={24} />, label: "Fund", bg: "bg-gray-300", link: "/fundwallet" },
            { icon: <FaBolt size={24} />, label: "Electricity", bg: "bg-gray-300", link: "/bills" },
            { icon: <FaPaperPlane size={24} />, label: "Transfer", bg: "bg-gray-300", link: "/transfer" },
            { icon: <FaFileAlt size={24} />, label: "Result Checker", bg: "bg-gray-300", link: "/exams" },
            { icon: <FaTv size={24} />, label: "TV subscription", bg: "bg-gray-300", link: "/cable" },
            { icon: <FaComments size={24} />, label: "Bulk SMS", bg: "bg-gray-300", link: "/bluksms" },
            { icon: <FaMoneyBillWave size={24} />, label: "Airtime to Cash", bg: "bg-gray-300", link: "/airtime2cash" },
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:bg-blue-50 transition"
              onClick={() => handleNavigate(action.link)}
            >
              <div className="text-blue-600 mb-2">{action.icon}</div>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Share Button */}
      <button
        onClick={handleShare}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
        aria-label="Share"
      >
        <FaShareAlt size={24} />
      </button>
    </div>
  );
};

export default Dashboard;
