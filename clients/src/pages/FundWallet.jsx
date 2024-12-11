import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiClipboard } from "react-icons/fi";

function FundWallet() {
  const navigate = useNavigate();

  const handleCopy = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    alert(`Copied: ${accountNumber}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 flex items-center text-sky-500 hover:text-yellow-400 transition-colors"
      >
        <FiArrowLeft size={24} />
        <span className="ml-2 text-lg">Back to Home</span>
      </button>

      {/* Header */}
      <h1 className="text-4xl font-extrabold text-sky-500 mb-8">Fund Wallet</h1>

      {/* Payment Method Label */}
      <label className="block text-lg font-semibold text-sky-500 mb-6">
        Select Payment Method
      </label>

      {/* Payment Options */}
      <div className="grid grid-cols-1 gap-6 w-full max-w-lg">

        {/* Moni Point Card */}
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-sky-500/50">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YYcVr1Z8AdUsRJdFs9_NIwHaEK%26pid%3DApi%26h%3D160&f=1"
            alt="Moni Point Logo"
            className="h-16 mb-4 mx-auto object-contain"
          />
          <h2 className="text-2xl font-semibold text-center mb-2 text-sky-500">Moni Point</h2>
          <div className="flex justify-between items-center bg-sky-100 p-3 rounded-md">
            <div>
              <p className="text-sm text-sky-500">Account Number:</p>
              <p className="text-lg font-bold text-sky-600">394933939</p>
            </div>
            <button
              onClick={() => handleCopy("394933939")}
              className="text-sky-500 hover:text-yellow-400 transition-colors"
              title="Copy Account Number"
            >
              <FiClipboard size={24} />
            </button>
          </div>
          <p className="text-center mt-2 text-sm text-sky-500">Account Name: User</p>
        </div>
      </div>
    </div>
  );
}

export default FundWallet;

