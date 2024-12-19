import { useNavigate } from "react-router-dom";
import {
  CashIcon,
  ChatAlt2Icon,
} from "@heroicons/react/outline";
//import { FaSms } from "react-icons/fa";

function More() {
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Airtime to Cash", route: "/airtime2cash", icon: CashIcon },
    { label: "Bulk SMS", route: "/bluksms", icon: ChatAlt2Icon },
    //{ label: "Cable Subscription", route: "/cable", icon: DesktopComputerIcon },
    //{ label: "Bonus to Wallet", route: "/bonus", icon: GiftIcon },
    //{ label: "My Referrers", route: "/referrers", icon: UsersIcon },
    //{ label: "Bulk SMS", route: "/bluksms", icon: FaSms  },
  ];

  return (
    <div className="min-h-screen bg-white-900 text-sky-400 flex flex-col items-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 text-sky-400 hover:text-sky-600"
      >
        &larr; Back to Dashboard
      </button>

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">More Services</h1>

      {/* Menu Options */}
      <div className="w-full max-w-md p-4 bg-white-700 shadow-md rounded-lg">
        <ul className="space-y-4">
          {menuOptions.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => navigate(option.route)}
                className="w-full flex items-center bg-sky-500 hover:bg-white-600 text-sky-900 py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105"
              >
                <option.icon className="h-6 w-6 mr-3 text-gray-900" />
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default More;

