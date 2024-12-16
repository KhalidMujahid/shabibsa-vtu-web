import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../services/baseURL";

function BuyAirtime() {
  const navigate = useNavigate();
  const [networks] = useState(["MTN", "Airtel", "GLO", "9Mobile"]);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pin, setPin] = useState("");

  const handlePurchase = () => {
    if (!selectedNetwork || !amount || !phone) {
      toast.error("Please complete all fields before proceeding.", { position: "top-center" });
      return;
    }
    setShowModal(true);
  };

  const handleConfirmPurchase = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/purchase/airtime`, {
        network: selectedNetwork,
        amount,
        phone,
        pin,
      });

      toast.success("Airtime purchase successful!", { position: "top-center" });
      setShowModal(false);
      setSelectedNetwork("");
      setAmount("");
      setPhone("");
      setPin("");
    } catch (error) {
      console.error("Error purchasing airtime:", error);
      toast.error("Failed to complete the purchase. Please try again.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <ToastContainer />
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Buy Airtime</h1>
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <label className="block text-blue-700 font-medium mb-2">Select Network</label>
        <select
          className="w-full p-3 bg-white border border-blue-500 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSelectedNetwork(e.target.value)}
          value={selectedNetwork}
        >
          <option value="">Select Network</option>
          {networks.map((network, index) => (
            <option key={index} value={network}>{network}</option>
          ))}
        </select>

        <label className="block text-blue-700 font-medium mb-2">Enter Amount</label>
        <input
          type="number"
          className="w-full p-3 bg-white border border-blue-500 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label className="block text-blue-700 font-medium mb-2">Enter Phone Number</label>
        <input
          type="text"
          className="w-full p-3 bg-white border border-blue-500 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handlePurchase}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Purchase Airtime
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Confirm Your Details</h2>
            <div className="text-left mb-4">
              <p className="text-blue-700"><strong>Network:</strong> {selectedNetwork || "N/A"}</p>
              <p className="text-blue-700"><strong>Amount:</strong> ₦{amount || "N/A"}</p>
              <p className="text-blue-700"><strong>Phone Number:</strong> {phone || "N/A"}</p>
            </div>
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Enter 4-Digit PIN</h2>
            <input
              type="password"
              maxLength="4"
              className="w-full p-3 bg-white text-blue-700 border border-blue-400 rounded-lg text-center text-2xl tracking-widest mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleConfirmPurchase}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyAirtime;

