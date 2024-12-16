import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AiOutlineMenu,
  AiOutlineBell,
} from "react-icons/ai";

function Settings() {
  const { user } = useSelector((state) => state.user);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [profileData, setProfileData] = useState({
    name: user.firstname,
    email: user.email,
  });

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match!");
    } else {
      setMessage("Password successfully updated!");
    }
  };
  
  const handlePinChange = (e) => {
    e.preventDefault();
    if (newPin !== confirmPin) {
      setMessage("New pin and confirmation do not match!");
    } else {
      setMessage("Pin successfully updated!");
    }
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    setMessage(`Notifications ${notifications ? "disabled" : "enabled"}.`);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully!");
  };

  const handleAccountDeactivation = () => {
    const confirmDeactivate = window.confirm(
      "Are you sure you want to deactivate your account? This action cannot be undone."
    );
    if (confirmDeactivate) {
      setMessage("Account deactivated successfully!");
    }
  };
  
  const handleNavigate = (path) => navigate(path);
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <button onClick={() => handleNavigate("/menu") }>
          <AiOutlineMenu size={24} className="text-blue-600 cursor-pointer"/>
        </button>
        <h1 className="text-lg font-semibold text-blue-800">Settings</h1>
        <div className="relative">
          <AiOutlineBell size={24} className="text-blue-600 cursor-pointer" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </div>
      </header>
      <div className="container mx-auto px-6 py-12">

        {/* Password Reset Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 border rounded-md focus:ring-2 focus:ring-sky-400"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 border rounded-md focus:ring-2 focus:ring-sky-400"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 border rounded-md focus:ring-2 focus:ring-sky-400"
              required
            />
            <button
              type="submit"
              className="bg-sky-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-sky-600 transition"
            >
              Update Password
            </button>
          </form>
        </section>
        
        {/* Pin Reset Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change PIN</h2>
          <form onSubmit={handlePinChange} className="space-y-4">
            <input
              type="password"
              placeholder="Current PIN"
              value={currentPin}
              onChange={(e) => setCurrentPin(e.target.value)}
              className="w-full p-4 bg-gray-50 border rounded-md focus:ring-2 focus:ring-sky-400"
              required
            />
            <input
              type="password"
              placeholder="New PIN"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              className="w-full p-4 bg-gray-50 border rounded-md focus:ring-2 focus:ring-sky-400"
              required
            />
            <input
              type="password"
              placeholder="Confirm New PIN"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className="w-full p-4 bg-gray-50 border rounded-md focus:ring-2 focus:ring-sky-400"
              required
            />
            <button
              type="submit"
              className="bg-sky-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-sky-600 transition"
            >
              Update PIN
            </button>
          </form>
        </section>

        {/* Notifications Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Enable Notifications</span>
            <button
              onClick={toggleNotifications}
              className={`py-2 px-6 rounded-md font-semibold transition ${
                notifications
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {notifications ? "Disable" : "Enable"}
            </button>
          </div>
        </section>

        {/* Profile Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              className="w-full p-4 bg-gray-50 border rounded-md focus:ring-2 focus:ring-sky-400"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              className="w-full p-4 bg-gray-50 border rounded-md focus:ring-2 focus:ring-sky-400"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 text-gray-900 py-3 px-6 rounded-md font-semibold hover:bg-yellow-600 transition"
            >
              Update Profile
            </button>
          </form>
        </section>

        {/* Account Deactivation */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account</h2>
          <button
            onClick={handleAccountDeactivation}
            className="bg-red-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-red-600 transition"
          >
            Deactivate Account
          </button>
        </section>

        {/* Feedback Message */}
        {message && (
          <div className="fixed bottom-4 right-4 bg-sky-500 text-white py-3 px-6 rounded-md shadow-lg">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;

