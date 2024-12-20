import { FiCopy } from "react-icons/fi";

const Carousel = ({ user }) => {
  const handleCopy = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    alert(`Account number copied successful`);
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
                Moni Point
              </h2>
            </div>

            {/* Account Number */}
            <div className="mb-6">
              <p className="text-xs font-light tracking-wider">Account Number</p>
              <div className="flex items-center">
                <p className="text-lg font-bold tracking-widest">
                  {user?.user?.accountNumber || user?.accountNumber || "234 5678 9012 3456"}
                </p>
                <button
                  onClick={() => handleCopy(user?.accountNumber || user?.user?.accountNumber || "234 5678 9012 3456")}
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
                <p className="text-base font-semibold">
                  {user?.user?.firstname.toUpperCase() || user?.firstname.toUpperCase()} {user?.user?.lastname.toUpperCase() || user?.lastname.toUpperCase()}
                </p>
              </div>
              {/* User Initials */}
              <div className="bg-white text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {user?.user?.firstname[0].toUpperCase() || user.firstname[0].toUpperCase()}
                {user?.user?.lastname[0].toUpperCase() || user.firstname[0].toUpperCase()}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Carousel;

