const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-6">
      <div className="container mx-auto px-6">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-semibold text-white">Shabibsa</h4>
            <p className="mt-2 text-sm text-gray-200">
              Simplifying your financial needs with secure and reliable services.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="mt-4 md:mt-0">
            <ul className="flex justify-center space-x-6">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-200 transition"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-200 transition"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-200 transition"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-200 transition"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-blue-300"></div>

        {/* Copyright */}
        <p className="mt-4 text-sm text-center text-gray-200">
          © {new Date().getFullYear()} Shabibsa. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

