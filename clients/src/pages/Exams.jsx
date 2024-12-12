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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const payload = {
      exam_name: examName,
      quantity: quantity,
    };

    try {
      const response = await fetch(`${baseURL}/exams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Exam pins generated successfully!");
        console.log("Backend response:", data);
        setExamName("");
        setQuantity(1);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to generate exam pins.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("Error during fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-900 text-sky-400 flex flex-col items-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/more")}
        className="self-start mb-4 text-sky-500 hover:text-sky-600"
      >
        &larr; Back
      </button>

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Generate Exam Pins</h1>

      {/* Form Container */}
      <div className="w-full max-w-md bg-sky-700 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Exam Name Input */}
          <div>
            <label
              htmlFor="examName"
              className="block text-sm font-medium text-yellow-300 mb-1"
            >
              Exam Name
            </label>
            <input
              type="text"
              id="examName"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              placeholder="e.g., WAEC, JAMB, NECO"
              className="w-full p-2 border-sky-500 bg-gray-800 text-white-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-500"
              required
            />
          </div>

          {/* Quantity Input */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-white-300 mb-1"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="w-full p-2 border-sky-500 bg-white-800 text-sky-300 rounded-lg focus:outline-none focus:ring focus:ring-yellow-500"
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          {/* Success Message */}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-2 rounded-lg text-gray-900 font-medium ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {loading ? "Generating..." : "Generate Pins"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Exams;

