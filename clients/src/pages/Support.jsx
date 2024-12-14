import { FaWhatsapp, FaEnvelope, FaPhone, FaArrowLeft, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Support() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white-900 flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/menu")}
        className="flex items-center self-start bg-white-800 p-3 rounded-lg shadow hover:bg-sky-700 transition-all mb-6"
      >
        <FaArrowLeft size={18} className="mr-2 text-sky-400" />
        <span className="text-sky-300 font-medium">Back</span>
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-sky-400 mb-4">Support</h1>
      <p className="text-sky-800 text-center mb-10">
        Need assistance? Reach out to us through any of the options below.
      </p>

      {/* Contact Options */}
      <div className="space-y-6 w-full max-w-md">
        {/* WhatsApp */}
        <a
          href="https://wa.me/+2348032904452"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-sky-500 text-white-900 p-4 rounded-lg shadow-md hover:bg-white-600 transition-all"
        >
          <FaWhatsapp size={24} className="mr-3 text-white-400" />
          <span className="font-semibold text-lg">WhatsApp</span>
        </a>

        {/* Email */}
        <a
          href="mailto:shabibsadata@gmail.com"
          className="flex items-center bg-sky-800 text-white-300 p-4 rounded-lg shadow-md hover:bg-sky-700 transition-all"
        >
          <FaEnvelope size={24} className="mr-3 text-white-400" />
          <span className="font-semibold text-lg">Email</span>
        </a>

        {/* Phone */}
        <a
          href="tel:+2348032904452"
          className="flex items-center bg-sky-800 text-sky-300 p-4 rounded-lg shadow-md hover:bg-sky-700 transition-all"
        >
          <FaPhone size={24} className="mr-3 text-yellow-400" />
          <span className="font-semibold text-lg">Phone</span>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=61551644067953&mibextid=ZbWKwL"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-blue-600 text-white-900 p-4 rounded-lg shadow-md hover:bg-blue-500 transition-all"
        >
          <FaFacebook size={24} className="mr-3 text-white-400" />
          <span className="font-semibold text-lg">Facebook</span>
        </a>
      </div>

      {/* Footer Text */}
      <div className="mt-12 text-sky-800 text-center">
        <p className="text-sm">
          We're here to help! Feel free to contact us for any inquiries or support.
        </p>
      </div>
    </div>
  );
}

export default Support;

