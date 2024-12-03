import { useNavigate } from "react-router-dom";

function Airtime2cash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-yellow-400 flex flex-col items-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/more")}
        className="self-start mb-4 text-yellow-500 hover:text-yellow-600"
      >
        &larr; Back
      </button>

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Transfer Funds</h1>

      {/* Feature Information */}
      <div className="w-full max-w-md p-4 bg-gray-700 rounded-lg shadow-md text-center">
        <p className="text-yellow-300 font-medium mb-4">
          Airtime2Cash functionality is coming soon. Stay tuned!
        </p>
        <div className="w-full bg-gray-800 text-yellow-400 py-3 rounded-md">
          <p>Feature in progress...</p>
        </div>
      </div>
    </div>
  );
}

export default Airtime2cash;

