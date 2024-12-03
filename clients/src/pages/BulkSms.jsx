import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseURL } from "../services/baseURL";

function BulkSms() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendSms = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const recipients = e.target.recipients.value.split(",").map((num) => num.trim());
    const message = e.target.message.value;

    try {
      // Send to backend
      const response = await fetch(`${baseURL}/bulksms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipients, message }),
      });

      if (response.ok) {
        setSuccess("SMS sent successfully!");
        e.target.reset();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to send SMS. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-yellow-400 flex flex-col items-center p-6 relative">
      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 text-yellow-500 hover:text-yellow-600"
      >
        &larr; Back to Dashboard
      </button>

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Send Bulk SMS</h1>

      {/* SMS Form */}
      <div className="w-full max-w-lg bg-gray-700 text-yellow-400 shadow-md rounded-lg p-6">
        <form onSubmit={handleSendSms} className="space-y-4">
          {/* Recipients Input */}
          <div>
            <label
              htmlFor="recipients"
              className="block text-sm font-medium text-yellow-300 mb-1"
            >
              Recipients (comma-separated numbers)
            </label>
            <input
              type="text"
              id="recipients"
              name="recipients"
              placeholder="e.g., 1234567890, 0987654321"
              className="w-full border-gray-500 bg-gray-800 text-yellow-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-yellow-500"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-yellow-300 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Type your message here..."
              className="w-full border-gray-500 bg-gray-800 text-yellow-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-yellow-500"
              required
            ></textarea>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Success Message */}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full text-gray-900 py-2 px-4 rounded-lg font-medium ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send SMS"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BulkSms;

