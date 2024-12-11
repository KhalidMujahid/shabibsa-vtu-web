import { useState } from "react";

function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match!");
    } else {
      setMessage("Password successfully updated!");
      // Call API to update password here
    }
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    setMessage(`Notifications ${notifications ? "disabled" : "enabled"}.`);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully!");
    // Call API to update profile here
  };

  const handleAccountDeactivation = () => {
    const confirmDeactivate = window.confirm(
      "Are you sure you want to deactivate your account? This action cannot be undone."
    );
    if (confirmDeactivate) {
      setMessage("Account deactivated successfully!");
      // Call API to deactivate account here
    }
  };

  return (
    <div className="font-sans bg-white-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-sky-400 mb-6">Settings</h1>

        {/* Password Reset Section */}
        <section className="bg-white-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-sky-400 mb-4">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 bg-white-700 text-sky-300 rounded-md border border-sky-600"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 bg-white-700 text-sky-300 rounded-md border border-sky-600"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-white-700 text-sky-300 rounded-md border border-sky-600"
              required
            />
            <button
              type="submit"
              className="bg-sky-400 text-white-900 px-6 py-2 rounded-md font-semibold hover:bg-sky-500 transition"
            >
              Update Password
            </button>
          </form>
          {message && <p className="mt-4 text-sky-300">{message}</p>}
        </section>

        {/* Notifications Section */}
        <section className="bg-white-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-sky-400 mb-4">Notifications</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Enable Notifications</span>
            <button
              onClick={toggleNotifications}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                notifications
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {notifications ? "Disable" : "Enable"}
            </button>
          </div>
        </section>

        {/* Other Settings Section */}
        <section className="bg-white-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-sky-400 mb-4">Other Settings</h2>
          {/* Profile Update */}
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              className="w-full p-3 bg-white-700 text-sky-300 rounded-md border border-sky-600"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              className="w-full p-3 bg-white-700 text-sky-300 rounded-md border border-sky-600"
              required
            />
            <button
              type="submit"
              className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
            >
              Update Profile
            </button>
          </form>

          {/* Account Deactivation */}
          <div className="mt-6">
            <button
              onClick={handleAccountDeactivation}
              className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Deactivate Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Settings;
