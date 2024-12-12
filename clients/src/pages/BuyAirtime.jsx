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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onHandleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleConfirm = () => {
    if (!selectedValue || !phone || !amount) {
      toast.error("All fields are required.", { position: "top-center" });
      return;
    }
    setIsConfirmModalOpen(true);
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
      setIsPinModalOpen(false);
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Error purchasing airtime:", error);
      toast.error("Failed to purchase airtime. Please try again.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-6 relative">
      <ToastContainer />

      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}

      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 text-blue-500 hover:text-blue-600 flex items-center"
      >
        &larr; <span className="ml-2">Back</span>
      </button>

      <h1 className="text-3xl font-extrabold mb-6">Buy Airtime</h1>

      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg border border-gray-300">
        <label className="block text-gray-600 font-medium mb-2">Select Network</label>
        <select
          onChange={onHandleChange}
          value={selectedValue}
          className="w-full p-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 mb-4"
        >
          <option value="" className="text-gray-500">Select Network Provider</option>
          <option value="1">MTN</option>
          <option value="2">Airtel</option>
          <option value="3">Glo</option>
          <option value="4">9Mobile</option>
        </select>

        <label className="block text-gray-600 font-medium mb-2">Enter Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 mb-4"
          placeholder="Enter amount in NGN"
        />
        <p className="text-blue-500">Amount must start from 95</p>
        <br />

        <label className="block text-gray-600 font-medium mb-2">Enter Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 mb-4"
          placeholder="Enter Phone Number"
        />

        <button
          onClick={handleConfirm}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Purchase Airtime
        </button>
      </div>

      {/* Confirm Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Confirm Information</h2>
            <p className="text-gray-700 mb-2">Network: {selectedValue}</p>
            <p className="text-gray-700 mb-2">Phone: {phone}</p>
            <p className="text-gray-700 mb-4">Amount: ₦{amount}</p>
            <div className="space-x-4">
              <button
                onClick={() => {
                  setIsConfirmModalOpen(false);
                  setIsPinModalOpen(true);
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PIN Modal */}
      {isPinModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Enter PIN</h2>
            <input
              type="password"
              maxLength="4"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-50 text-gray-800 border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 mb-4 text-center"
              placeholder="Enter 4-digit PIN"
            />
            <div className="space-x-4">
              <button
                onClick={handlePurchaseAirtime}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsPinModalOpen(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
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
            border-top: 8px solid #3b82f6; /* Tailwind's blue-500 */
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

