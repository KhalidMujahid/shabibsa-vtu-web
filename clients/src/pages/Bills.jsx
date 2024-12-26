import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Bills() {
  const navigate = useNavigate();
  const [disco, setDisco] = useState("");
  const [meterType, setMeterType] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    // Validation
    if (!disco || !meterType || !meterNumber || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    // Proceed with form submission (add payment logic here)
    setLoading(true);
    setTimeout(() => {
      alert("Bill payment successful!");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 text-gray-800">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-6 flex items-center text-blue-500 hover:text-blue-600 transition-colors"
      >
        &larr; Back to Dashboard
      </button>

      {/* Header */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        Bills Payment
      </h1>

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
          className={`w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-6 w-6 mx-auto"></div>
          ) : (
            "Pay Bill"
          )}
        </button>
      </div>
    </div>
  );
}

export default Bills;