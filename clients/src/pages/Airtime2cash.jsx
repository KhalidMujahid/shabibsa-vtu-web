import { useNavigate } from "react-router-dom";

function Airtime2cash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/more")}
        className="self-start mb-4 text-blue-500 hover:text-blue-600"
      >
        &larr; Back
      </button>

      {/* Page Title */}
      <h1 className="text-2xl font-extrabold mb-6">Transfer Funds</h1>

      {/* Feature Information */}
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg border border-gray-300 text-center">
        <p className="text-gray-600 font-medium mb-4">
          Airtime2Cash functionality is coming soon. Stay tuned!
        </p>
        <div className="w-full bg-blue-500 text-white py-3 rounded-md">
          <p>Feature in progress...</p>
        </div>
      </div>
    </div>
  );
}

export default Airtime2cash;

