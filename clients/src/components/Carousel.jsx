import { FiCopy } from "react-icons/fi";

const Carousel = ({ user }) => {
  const handleCopy = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    alert(`Account number copied successfully`);
  };

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="flex overflow-x-auto space-x-4 p-6 snap-x snap-mandatory">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white w-80 rounded-xl shadow-lg p-6 flex-shrink-0 snap-start"
        >
          {/* Bank Name */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold uppercase tracking-wide">
              {user?.user?.account_name ?? "Unknown Bank"}
            </h2>
          </div>

          {/* Account Number */}
          <div className="mb-6">
            <p className="text-xs font-light tracking-wider">Account Number</p>
            <div className="flex items-center">
              <p className="text-lg font-bold tracking-widest">
                {user?.user?.account_number ?? "N/A"}
              </p>
              <button
                onClick={() =>
                  handleCopy(user?.user?.account_number ?? "N/A")
                }
                className="ml-3 text-blue-200 hover:text-blue-300 transition"
                title="Copy Account Number"
              >
                <FiCopy size={20} />
              </button>
            </div>
          </div>

          {/* Account Holder */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-base font-semibold">Shabibsadata</p>
            </div>
            {/* User Initials */}
            <div className="bg-white text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {user?.user?.firstname?.[0]?.toUpperCase() ?? "U"}
              {user?.user?.lastname?.[0]?.toUpperCase() ?? "N"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;