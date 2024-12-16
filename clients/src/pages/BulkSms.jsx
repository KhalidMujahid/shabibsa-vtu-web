import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseURL } from "../services/baseURL";

function BulkSms() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sender,setSender] = useState("");
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
        body: JSON.stringify({ recipients, message,sender }),
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
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-6 relative">
      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 text-blue-500 hover:text-blue-600"
      >
        &larr; Back to Dashboard
      </button>

      {/* Page Title */}
      <h1 className="text-3xl font-extrabold mb-6">Send Bulk SMS</h1>

      {/* SMS Form */}
      <div className="w-full max-w-lg bg-white text-gray-800 shadow-lg rounded-lg p-6 border border-gray-300">
        <form onSubmit={handleSendSms} className="space-y-4">
        {/* Sender Input */}
          <div>
            <label
              htmlFor="sender"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Sender Name
            </label>
            <input
              type="text"
              id="sender"
              name="sender"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Sender name"
              className="w-full border-gray-300 bg-gray-50 text-gray-800 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>

          {/* Recipients Input */}
          <div>
            <label
              htmlFor="recipients"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Recipients (comma-separated numbers)
            </label>
            <input
              type="text"
              id="recipients"
              name="recipients"
              placeholder="e.g., 1234567890, 0987654321"
              className="w-full border-gray-300 bg-gray-50 text-gray-800 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Type your message here..."
              className="w-full border-gray-300 bg-gray-50 text-gray-800 rounded-lg shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
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
              className={`w-full text-white py-2 px-4 rounded-lg font-medium ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
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

