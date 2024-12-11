import { useNavigate } from "react-router-dom";

function Transfer() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 flex items-center text-sky-500 hover:text-yellow-400 transition-colors"
      >
        &larr; Back to Dashboard
      </button>

      {/* Header */}
      <h1 className="text-3xl font-bold text-sky-500 mb-8">Transfer Funds</h1>

      {/* Notification Card */}
      <div className="w-full max-w-md p-6 bg-gray-100 shadow-md rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-sky-500/50">
        <p className="text-sky-500 font-medium mb-6">
          Funds transfer functionality is coming soon. Stay tuned!
        </p>
        <div className="w-full bg-sky-100 text-sky-500 py-4 rounded-md">
          <p className="text-lg font-semibold">Feature in progress...</p>
        </div>
      </div>
    </div>
  );
}

export default Transfer;

