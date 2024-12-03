import { useNavigate } from "react-router-dom";

function Bills() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6 text-yellow-300">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-6 flex items-center text-yellow-400 hover:text-yellow-500 transition-colors"
      >
        &larr; Back to Dashboard
      </button>

      {/* Header */}
      <h1 className="text-3xl font-extrabold text-yellow-400 mb-8">
        Bills Payment
      </h1>

      {/* Notification Card */}
      <div className="w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-yellow-500/50">
        <p className="text-yellow-300 font-medium mb-6">
          Bills payment functionality is coming soon. Stay tuned!
        </p>
        <div className="w-full bg-gray-700 text-yellow-400 py-4 rounded-md">
          <p className="text-lg font-semibold">Feature in progress...</p>
        </div>
      </div>
    </div>
  );
}

export default Bills;

