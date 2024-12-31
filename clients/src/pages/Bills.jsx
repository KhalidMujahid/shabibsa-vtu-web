import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../services/baseURL"; // Import the baseURL for the API

function Bills() {
  const navigate = useNavigate();
  const [disco, setDisco] = useState("");
  const [meterType, setMeterType] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [transactionPin, setTransactionPin] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = () => {
    // Validation
    if (!disco || !meterType || !meterNumber || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    // Show modal to enter PIN
    setShowModal(true);
  };

  const handlePinSubmit = async () => {
    // Validate transaction PIN (4 digits)
    if (transactionPin.length !== 4 || isNaN(transactionPin)) {
      alert("Please enter a valid 4-digit PIN.");
      return;
    }


    setLoading(true);
    setPaymentStatus(""); 

    try {
      const response = await fetch(`${baseURL}/bills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disco,
          meterType,
          meterNumber,
          amount,
          transactionPin,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success handling
        setPaymentStatus({ type: "success", message: "Bill payment successful!" });
      } else {
        // Error handling
        setPaymentStatus({ type: "error", message: data.message || "Something went wrong. Please try again." });
      }
    } catch (error) {
      setPaymentStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
      setShowModal(false); // Close the modal
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 text-gray-800">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-6 flex items-center text-blue-500 hover:text-blue-600 transition-colors"
      >
        &larr; Back
      </button>

      {/* Header */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Bills Payment</h1>

      {/* Bill Payment Form */}
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center border border-gray-300">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Select Disco</label>
          <select
            value={disco}
            onChange={(e) => setDisco(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Disco</option>
            <option value="PHCN">PHCN</option>
            <option value="EEDC">EEDC</option>
            <option value="IKEDC">IKEDC</option>
            <option value="KEDCO">KEDCO</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Meter Type</label>
          <select
            value={meterType}
            onChange={(e) => setMeterType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Meter Type</option>
            <option value="Prepaid">Prepaid</option>
            <option value="Postpaid">Postpaid</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Meter Number</label>
          <input
            type="text"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Meter Number"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Amount"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-6 w-6 mx-auto"></div>
          ) : (
            "Pay Bill"
          )}
        </button>

        {/* Payment Status Message */}
        {paymentStatus && (
          <div
            className={`mt-4 p-4 rounded-md ${paymentStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {paymentStatus.message}
          </div>
        )}
      </div>

      {/* Transaction PIN Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Enter Transaction PIN</h2>
            <input
              type="password"
              value={transactionPin}
              onChange={(e) => setTransactionPin(e.target.value)}
              maxLength={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
              placeholder="Enter 4-digit PIN"
              autoFocus
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handlePinSubmit}
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bills;