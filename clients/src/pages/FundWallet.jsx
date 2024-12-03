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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6 text-yellow-300">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 flex items-center text-yellow-400 hover:text-yellow-500 transition-colors"
      >
        <FiArrowLeft size={24} />
        <span className="ml-2 text-lg">Back to Home</span>
      </button>

      {/* Header */}
      <h1 className="text-4xl font-extrabold text-yellow-400 mb-8">Fund Wallet</h1>

      {/* Payment Method Label */}
      <label className="block text-lg font-semibold text-yellow-300 mb-6">
        Select Payment Method
      </label>

      {/* Payment Options */}
      <div className="grid grid-cols-1 gap-6 w-full max-w-lg">
        {/* Opay Card */}
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.2Ww-mx9QieC9ktcv_jnj9AHaDt%26pid%3DApi%26h%3D160&f=1"
            alt="Opay Logo"
            className="h-16 mb-4 mx-auto object-contain"
          />
          <h2 className="text-2xl font-semibold text-center mb-2">Opay</h2>
          <div className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
            <div>
              <p className="text-sm">Account Number:</p>
              <p className="text-lg font-bold">8038923044</p>
            </div>
            <button
              onClick={() => handleCopy("8038923044")}
              className="text-yellow-400 hover:text-yellow-500 transition-colors"
              title="Copy Account Number"
            >
              <FiClipboard size={24} />
            </button>
          </div>
          <p className="text-center mt-2 text-sm">Account Name: Jibrin Ndaman</p>
        </div>

        {/* Palmpay Card */}
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.gd65Dxw4Z9ZnlEF6wRFkpAHaBo%26pid%3DApi%26h%3D160&f=1"
            alt="Palmpay Logo"
            className="h-16 mb-4 mx-auto object-contain"
          />
          <h2 className="text-2xl font-semibold text-center mb-2">9psb</h2>
          <div className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
            <div>
              <p className="text-sm">Account Number:</p>
              <p className="text-lg font-bold">8038923044</p>
            </div>
            <button
              onClick={() => handleCopy("8038923044")}
              className="text-yellow-400 hover:text-yellow-500 transition-colors"
              title="Copy Account Number"
            >
              <FiClipboard size={24} />
            </button>
          </div>
          <p className="text-center mt-2 text-sm">Account Name: Jibrin Ndaman</p>
        </div>

        {/* Moni Point Card */}
        <div className="bg-gray-800 rounded-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YYcVr1Z8AdUsRJdFs9_NIwHaEK%26pid%3DApi%26h%3D160&f=1"
            alt="Moni Point Logo"
            className="h-16 mb-4 mx-auto object-contain"
          />
          <h2 className="text-2xl font-semibold text-center mb-2">First Bank</h2>
          <div className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
            <div>
              <p className="text-sm">Account Number:</p>
              <p className="text-lg font-bold">3090458368</p>
            </div>
            <button
              onClick={() => handleCopy("3090458368")}
              className="text-yellow-400 hover:text-yellow-500 transition-colors"
              title="Copy Account Number"
            >
              <FiClipboard size={24} />
            </button>
          </div>
          <p className="text-center mt-2 text-sm">Account Name: Jibrin Ndaman</p>
        </div>
      </div>
    </div>
  );
}

export default FundWallet;

