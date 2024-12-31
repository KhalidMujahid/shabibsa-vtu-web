import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../services/baseURL";
import { FiArrowLeft } from "react-icons/fi";

const Cable = () => {
  const [cable, setCable] = useState("");
  const navigate = useNavigate();
  const [iuc, setIuc] = useState("");
  const [cablePlan, setCablePlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setSuccessMessage("");
    setErrorMessage("");

    if (!cable || !iuc || !cablePlan) {
      setLoading(false);
      setErrorMessage("All fields are required.");
      return;
    }

    setIsModalOpen(true);
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4 || isNaN(pin)) {
      setErrorMessage("Please enter a valid 4-digit PIN.");
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const formData = {
        cable,
        iuc,
        cablePlan,
        pin,
      };

      const response = await fetch(`${baseURL}/cable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // If submission is successful
        setSuccessMessage(result.message || "Payment successful");
        setLoading(false);
        setIsModalOpen(false);

        setCable("");
        setIuc("");
        setCablePlan("");
        setPin("");
      } else {
        setErrorMessage(result.message || "An error occurred. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  // Close the modal without submitting
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setPin(""); // Clear the PIN field
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <FiArrowLeft size={24} />
        <span className="ml-2 text-lg font-semibold">Back </span>
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-700">Cable Information</h1>

      {/* Form Container */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cable Input */}
          <div>
            <label htmlFor="cable" className="block text-sm font-medium text-gray-700 mb-2">
              Cable
            </label>
            <input
              type="text"
              id="cable"
              value={cable}
              onChange={(e) => setCable(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* IUC Input */}
          <div>
            <label htmlFor="iuc" className="block text-sm font-medium text-gray-700 mb-2">
              IUC
            </label>
            <input
              type="text"
              id="iuc"
              value={iuc}
              onChange={(e) => setIuc(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Cable Plan Input */}
          <div>
            <label htmlFor="cablePlan" className="block text-sm font-medium text-gray-700 mb-2">
              Cable Plan
            </label>
            <input
              type="text"
              id="cablePlan"
              value={cablePlan}
              onChange={(e) => setCablePlan(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-600 bg-red-100 p-3 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="text-green-600 bg-green-100 p-3 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-medium transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* PIN Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Enter PIN</h2>
            <input
              type="text"
              maxLength="4"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 4-digit PIN"
            />
            {errorMessage && (
              <div className="text-red-600 text-sm mb-4">{errorMessage}</div>
            )}
            <div className="flex justify-between">
              <button
                onClick={handlePinSubmit}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Submit
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cable;