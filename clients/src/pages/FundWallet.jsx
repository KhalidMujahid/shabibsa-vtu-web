import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiClipboard } from "react-icons/fi";

function FundWallet() {
  const navigate = useNavigate();

  const handleCopy = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    // Display a toast notification
    const toast = document.createElement("div");
    toast.innerText = `Copied: ${accountNumber}`;
    toast.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg text-sm";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-6 flex items-center text-blue-500 hover:text-blue-700 transition-colors"
      >
        <FiArrowLeft size={24} />
        <span className="ml-2 text-lg font-medium">Back to Home</span>
      </button>

      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
        Fund Wallet
      </h1>

      {/* Payment Method Label */}
      <p className="text-lg font-semibold text-gray-700 mb-4">
        Select Payment Method
      </p>

      {/* Payment Options */}
      <div className="grid grid-cols-1 gap-6 w-full max-w-lg">
        {/* Moni Point Card */}
        <div className="bg-white rounded-lg p-6 flex flex-col justify-between shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YYcVr1Z8AdUsRJdFs9_NIwHaEK%26pid%3DApi%26h%3D160&f=1"
            alt="Moni Point Logo"
            className="h-16 mb-4 mx-auto object-contain"
          />
          <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
            Moni Point
          </h2>
          <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Account Number:</p>
              <p className="text-lg font-bold text-blue-600">394933939</p>
            </div>
            <button
              onClick={() => handleCopy("394933939")}
              className="text-blue-500 hover:text-blue-700 transition-colors"
              title="Copy Account Number"
            >
              <FiClipboard size={24} />
            </button>
          </div>
          <p className="text-center mt-4 text-sm text-gray-600">
            Account Name: <span className="font-medium">User</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FundWallet;

