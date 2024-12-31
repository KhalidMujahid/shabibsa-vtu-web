import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiClipboard } from "react-icons/fi";
import { useSelector } from "react-redux";

function FundWallet() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

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
            src="data:image/jpeg;base64,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"
            alt="Moni Point Logo"
            className="h-16 mb-4 mx-auto object-contain"
          />
          <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
            {user.user.account_name || user?.user?.account_name}
          </h2>

          {/* Account Details */}
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg mb-4">
            <div>
              <p className="text-sm text-gray-500">Account Number</p>
              <p className="text-lg font-semibold text-blue-600">{user.user.account_number || user?.user?.account_number }</p>
            </div>
            <button
              onClick={() => handleCopy(`${user.user.account_number || user?.user?.account_number}`)}
              className="text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Copy Account Number"
            >
              <FiClipboard size={24} />
            </button>
          </div>

          {/* Account Name */}
          <p className="text-sm text-gray-600 text-center">
            Account Name: <span className="font-semibold">Shabibsadata</span>
          </p>
        </div>
        <div>
  <p className="text-sm text-red-600 text-center">
    NOTE: A fee of ₦50 will be deducted from any funds you add.
  </p>
</div>

      </div>
    </div>
  );
}

export default FundWallet;