import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../services/baseURL";

function Exams() {
  const navigate = useNavigate();
  const [examName, setExamName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pin, setPin] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Before submitting, open the PIN modal
    setIsModalOpen(true);
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4 || isNaN(pin)) {
      setErrorMessage("Please enter a valid 4-digit PIN.");
      return;
    }

    // Proceed with the form submission if PIN is valid
    const payload = {
      exam_name: examName,
      quantity: quantity,
      pin: pin, // Add PIN to the payload
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${baseURL}/exams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Exam pins generated successfully!");
        setExamName("");
        setQuantity(1);
        setPin(""); // Reset PIN after successful submission
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to generate exam pins.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }

    // Close modal after submission
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPin(""); // Reset PIN input when modal closes
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 text-blue-600 hover:text-blue-800 flex items-center"
      >
        &larr; Back
      </button>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Generate Exam Pins</h1>

      {/* Form Container */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Exam Name Dropdown */}
          <div>
            <label
              htmlFor="examName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Exam Name
            </label>
            <select
              id="examName"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="" disabled>
                Select Exam
              </option>
              <option value="WAEC">WAEC</option>
              <option value="NECO">NECO</option>
              <option value="NABTEB">NABTEB</option>
            </select>
          </div>

          {/* Quantity Input */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
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
              className={`w-full py-3 rounded-lg text-white font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Generating..." : "Generate Pins"}
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
}

export default Exams;