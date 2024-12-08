import { useNavigate } from "react-router-dom";

function Bills() {
  const navigate = useNavigate();

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

      {/* Notification Card */}
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center border border-gray-300">
        <p className="text-gray-600 font-medium mb-6">
          Bills payment functionality is coming soon. Stay tuned!
        </p>
        <div className="w-full bg-blue-500 text-white py-4 rounded-md">
          <p className="text-lg font-semibold">Feature in progress...</p>
        </div>
      </div>
    </div>
  );
}

export default Bills;

