import { useState } from "react";
import { FaUserEdit, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);

  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Profile updated:", { username, email });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
      {loading && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Profile</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center text-yellow-400">
        {/* Profile Picture */}
        <div className="relative mb-6">
          <img
            src={profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover border-4 border-yellow-500"
          />
          <label
            htmlFor="profile-picture"
            className="absolute bottom-0 right-0 bg-yellow-500 text-gray-900 rounded-full p-2 cursor-pointer"
          >
            <FaCamera size={20} />
          </label>
          <input
            id="profile-picture"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
          />
        </div>

        {/* Username Input */}
        <div className="w-full mb-4">
          <label className="block text-sm font-medium text-yellow-300 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-gray-700 text-yellow-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Email Input */}
        <div className="w-full mb-6">
          <label className="block text-sm font-medium text-yellow-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-700 text-yellow-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition-all"
        >
          Save Changes
        </button>
      </div>

      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-gray-700 text-yellow-400 font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-all"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default Profile;

