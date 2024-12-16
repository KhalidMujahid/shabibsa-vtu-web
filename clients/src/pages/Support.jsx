import { FaWhatsapp, FaEnvelope, FaPhone, FaArrowLeft, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Support() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center px-6 py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate("/menu")}
        className="flex items-center self-start bg-gray-200 text-gray-700 py-2 px-4 rounded-full shadow hover:bg-gray-300 transition-all mb-8"
      >
        <FaArrowLeft size={18} className="mr-2" />
        <span className="font-medium">Back</span>
      </button>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Support</h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl mb-12">
        Need assistance? Reach out to us using any of the options below. We’re here to help!
      </p>

      {/* Contact Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* WhatsApp */}
        <a
          href="https://wa.me/+2348032904452"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-green-100 text-green-700 py-4 px-6 rounded-lg shadow hover:bg-green-200 transition-all"
        >
          <FaWhatsapp size={28} className="mr-4" />
          <span className="font-semibold text-lg">WhatsApp</span>
        </a>

        {/* Email */}
        <a
          href="mailto:shabibsadata@gmail.com"
          className="flex items-center bg-blue-100 text-blue-700 py-4 px-6 rounded-lg shadow hover:bg-blue-200 transition-all"
        >
          <FaEnvelope size={28} className="mr-4" />
          <span className="font-semibold text-lg">Email</span>
        </a>

        {/* Phone */}
        <a
          href="tel:+2348032904452"
          className="flex items-center bg-yellow-100 text-yellow-700 py-4 px-6 rounded-lg shadow hover:bg-yellow-200 transition-all"
        >
          <FaPhone size={28} className="mr-4" />
          <span className="font-semibold text-lg">Phone</span>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=61551644067953&mibextid=ZbWKwL"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-blue-600 text-white py-4 px-6 rounded-lg shadow hover:bg-blue-500 transition-all"
        >
          <FaFacebook size={28} className="mr-4" />
          <span className="font-semibold text-lg">Facebook</span>
        </a>
      </div>

      {/* Footer Text */}
      <div className="mt-16 text-gray-500 text-center">
        <p className="text-sm">
          We're here to help! Feel free to contact us for any inquiries or support.
        </p>
      </div>
    </div>
  );
}

export default Support;

