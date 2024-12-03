const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-6">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold text-yellow-400">Shabibsa</h4>
            <p className="mt-2 text-sm">
              Simplifying your financial needs with secure and reliable services.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="mt-4 md:mt-0">
            <ul className="flex justify-center space-x-6">
              <li>
                <a
                  href="#"
                  className="text-yellow-400 hover:text-yellow-500 transition"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-yellow-400 hover:text-yellow-500 transition"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-yellow-400 hover:text-yellow-500 transition"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-yellow-400 hover:text-yellow-500 transition"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-700"></div>

        {/* Copyright */}
        <p className="mt-4 text-sm text-center">
          © {new Date().getFullYear()} Shabibsa. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
