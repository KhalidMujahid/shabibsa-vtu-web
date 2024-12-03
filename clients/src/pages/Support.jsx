import { FaWhatsapp, FaEnvelope, FaPhone, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Support() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/menu")}
        className="flex items-center self-start bg-gray-800 p-3 rounded-lg shadow hover:bg-gray-700 transition-all mb-6"
      >
        <FaArrowLeft size={18} className="mr-2 text-yellow-400" />
        <span className="text-yellow-300 font-medium">Back</span>
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">Support</h1>
      <p className="text-yellow-300 text-center mb-10">
        Need assistance? Reach out to us through any of the options below.
      </p>
      
      {/* Contact Options */}
      <div className="space-y-6 w-full max-w-md">
        {/* WhatsApp */}
        <a
          href="https://wa.me/+2348038923044"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-yellow-500 text-gray-900 p-4 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
        >
          <FaWhatsapp size={24} className="mr-3" />
          <span className="font-semibold text-lg">WhatsApp</span>
        </a>

        {/* Email */}
        <a
          href="mailto:banaconnect@gmail.com"
          className="flex items-center bg-gray-800 text-yellow-300 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-all"
        >
          <FaEnvelope size={24} className="mr-3 text-yellow-400" />
          <span className="font-semibold text-lg">Email</span>
        </a>

        {/* Phone */}
        <a
          href="tel:+2348038923044"
          className="flex items-center bg-gray-800 text-yellow-300 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-all"
        >
          <FaPhone size={24} className="mr-3 text-yellow-400" />
          <span className="font-semibold text-lg">Phone</span>
        </a>
      </div>

      {/* Footer Text */}
      <div className="mt-12 text-yellow-300 text-center">
        <p className="text-sm">
          We're here to help! Feel free to contact us for any inquiries or support.
        </p>
      </div>
    </div>
  );
}

export default Support;

