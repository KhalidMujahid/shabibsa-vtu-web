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
    <div className="fixed bottom-0 w-full bg-white flex justify-around items-center border-t border-gray-300 py-3 shadow-lg">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`flex flex-col items-center ${
            location.pathname === item.path ? "text-blue-600" : "text-gray-600"
          } transition-colors duration-200 hover:text-blue-500`}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <span className="text-sm">{item.label}</span>
          {/* Notification Badge for 'Menu' */}
          {item.label === "Menu" && (
            <span className="absolute top-1 right-1 bg-blue-600 text-white text-xs rounded-full px-1">
              3
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default Navbar;

