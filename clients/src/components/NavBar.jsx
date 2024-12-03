import { AiOutlineHome, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <AiOutlineHome size={24} />, label: "Home", path: "/dashboard" },
    { icon: <AiOutlineUser size={24} />, label: "Profile", path: "/profile" },
    { icon: <AiOutlineMenu size={24} />, label: "Menu", path: "/menu" },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 flex justify-around items-center border-t border-gray-700 py-3 shadow-lg">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`flex flex-col items-center ${
            location.pathname === item.path ? "text-yellow-400" : "text-gray-400"
          } transition-colors duration-200 hover:text-yellow-300`}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <span className="text-sm">{item.label}</span>
          {/* Notification Badge for 'Menu' */}
          {item.label === "Menu" && (
            <span className="absolute top-1 right-1 bg-yellow-500 text-gray-900 text-xs rounded-full px-1">
              3
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default Navbar;

