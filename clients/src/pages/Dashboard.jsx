import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "../components/Carousel";
import {
  AiOutlineMenu,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineBell,
} from "react-icons/ai";
import {
  FaMobileAlt,
  FaCreditCard,
  FaWifi,
  FaBolt,
  FaPaperPlane,
  FaSms,
  FaTv,
  FaEye,
  FaEyeSlash,
  FaBell,
  FaFileAlt,
  FaMoneyBillWave,
  FaComments,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user,balance } = useSelector((state) => state.user);
  const [showBalance, setShowBalance] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      toast.error("Error loading user data!");
    }
  }, [user]);

  const toggleBalance = () => setShowBalance(!showBalance);

  const handleNavigate = (path) => navigate(path);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <ToastContainer />

      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <button onClick={() => handleNavigate("/menu") }>
          <AiOutlineMenu size={24} className="text-blue-600 cursor-pointer"/>
        </button>
        <h1 className="text-lg font-semibold text-blue-800">Dashboard</h1>
        <div className="relative">
          <AiOutlineBell size={24} className="text-blue-600 cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </div>
      </header>

      {/* Welcome Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Welcome, {user?.firstname}!</h2>
            <p className="text-gray-600 mb-6">
              Discover seamless services including airtime, data, bill payments, and more. For
              assistance, visit our support page.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  setShowModal(false);
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
        {/* Balance Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{user?.firstname} {user?.lastname}</h2>
              <p className="text-sm text-gray-500">@{user?.username}</p>
            </div>
            <button
              onClick={toggleBalance}
              className="text-blue-600 hover:text-blue-700"
              aria-label="Toggle Balance Visibility"
            >
              {showBalance ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-sm text-gray-500">Available Balance</h3>
            <p className="text-3xl font-bold">{showBalance ? `₦${balance.toLocaleString()}` : "****"}</p>
          </div>
        </div>
        
        <Carousel user={user} />


        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
              { icon: <FaCreditCard size={24} />, label: "Fund", bg: "bg-gray-300", link: "/fundwallet" },
          { icon: <FaMobileAlt size={24} />, label: "Airtime", bg: "bg-gray-300", link: "/buyairtime" },
          { icon: <FaWifi size={24} />, label: "Data", bg: "bg-gray-300", link: "/buydata" },
          { icon: <FaBolt size={24} />, label: "Electricity", bg: "bg-gray-300", link: "/bills" },
          { icon: <FaPaperPlane size={24} />, label: "Transfer", bg: "bg-gray-300", link: "/transfer" },
          { icon: <FaFileAlt size={24} />, label: "Result Checker", bg: "bg-gray-300", link: "/exams" },
          { icon: <FaTv size={24} />, label: "TV subscription", bg: "bg-gray-300", link: "/cable" },
          { icon: <FaMoneyBillWave size={24} />, label: "Airtime to Cash", bg: "bg-gray-300", link: "/airtime2cash" },
          { icon: <FaComments size={24} />, label: "Bulk SMS", bg: "bg-gray-300", link: "/bluksms" },
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
    </div>
  );
};

export default Dashboard;

