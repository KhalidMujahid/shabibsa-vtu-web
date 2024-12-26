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
      "fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-opacity duration-300 opacity-0 animate-toast";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "1";
    }, 100);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <FiArrowLeft size={24} />
        <span className="ml-2 text-lg font-semibold">Back </span>
      </button>

      {/* Header */}
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">
        Fund Your Wallet
      </h1>

      {/* Payment Method Section */}
      <p className="text-lg font-medium text-gray-700 mb-6">
        Select a Payment Method
      </p>

      {/* Payment Option Card */}
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105 p-6">
          {/* Card Header */}
          <img
            src="https://via.placeholder.com/150"
            alt="Moni Point Logo"
            className="h-16 mb-4 mx-auto object-contain"
          />
          <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
            Moni Point
          </h2>

          {/* Account Details */}
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg mb-4">
            <div>
              <p className="text-sm text-gray-500">Account Number</p>
              <p className="text-lg font-semibold text-blue-600">5343824684</p>
            </div>
            <button
              onClick={() => handleCopy("5343824684")}
              className="text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Copy Account Number"
            >
              <FiClipboard size={24} />
            </button>
          </div>

          {/* Account Name */}
          <p className="text-sm text-gray-600 text-center">
            Account Name: <span className="font-semibold">Shabibsa Enterprices</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FundWallet;

