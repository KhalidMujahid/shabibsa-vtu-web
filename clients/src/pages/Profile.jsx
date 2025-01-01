import { useState } from "react";
import { FaUserEdit, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);

  const [username, setUsername] = useState(user?.username || user?.user?.username);
  const [email, setEmail] = useState(user?.email || user?.email?.email);
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
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      {loading && (
        <div className="absolute inset-0 bg-sky-100 bg-opacity-50 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-sky-500 mb-6">Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
        {/* Profile Picture */}
        <div className="relative mb-6">
          <img
            src={profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover border-4 border-sky-500"
          />
          <label
            htmlFor="profile-picture"
            className="absolute bottom-0 right-0 bg-sky-500 text-white rounded-full p-2 cursor-pointer"
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
          <label className="block text-sm font-medium text-sky-500 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-white text-sky-500 border border-sky-400 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Email Input */}
        <div className="w-full mb-6">
          <label className="block text-sm font-medium text-sky-500 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-white text-sky-500 border border-sky-400 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-sky-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-sky-600 transition-all"
        >
          Save Changes
        </button>
      </div>

      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-gray-200 text-sky-500 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-all"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default Profile;

