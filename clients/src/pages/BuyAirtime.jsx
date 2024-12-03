import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { baseURL } from "../services/baseURL";

function BuyAirtime() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handlePurchaseAirtime = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseURL}/airtime/buy`,
        {
          network_id: selectedValue,
          phone,
          amount,
          pin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Airtime purchased successfully!", { position: "top-center" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error purchasing airtime:", error);
      toast.error("Failed to purchase airtime. Please try again.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6 relative">
      <ToastContainer />

      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}

      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 text-yellow-300 hover:text-yellow-400 flex items-center"
      >
        &larr; <span className="ml-2">Back</span>
      </button>

      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Buy Airtime</h1>

      <div className="w-full max-w-md p-4 bg-gray-800 shadow-md rounded-lg">
        <label className="block text-yellow-300 font-medium mb-2">Select Network</label>
        <select
          onChange={onHandleChange}
          value={selectedValue}
          className="w-full p-2 border rounded-md bg-gray-900 text-yellow-300 border-gray-700 focus:outline-none mb-4"
        >
          <option value="" className="text-gray-500">Select Network Provider</option>
          <option value="1">MTN</option>
          <option value="2">Airtel</option>
          <option value="3">Glo</option>
          <option value="4">9Mobile</option>
        </select>

        <label className="block text-yellow-300 font-medium mb-2">Enter Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-900 text-yellow-300 border-gray-700 focus:outline-none mb-4"
          placeholder="Enter amount in NGN"
        />
        <p className="text-yellow-500">Amount must start from 95</p>
        <br />

        <label className="block text-yellow-300 font-medium mb-2">Enter Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-900 text-yellow-300 border-gray-700 focus:outline-none mb-4"
          placeholder="Enter Phone Number"
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-yellow-500 text-gray-900 py-2 rounded-md hover:bg-yellow-600"
        >
          Purchase Airtime
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm text-yellow-300">
            <h2 className="text-xl font-bold mb-4">Enter PIN</h2>
            <input
              type="password"
              maxLength="4"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-900 text-yellow-300 border-gray-700 focus:outline-none mb-4 text-center"
              placeholder="Enter 4-digit PIN"
            />
            <div className="space-x-4">
              <button
                onClick={handlePurchaseAirtime}
                className="bg-yellow-500 text-gray-900 py-2 px-4 rounded-md hover:bg-yellow-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-700 text-yellow-300 py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>
        {`
          .loader {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #fbbf24; /* Tailwind's yellow-400 */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

export default BuyAirtime;

