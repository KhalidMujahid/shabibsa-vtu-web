import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setFormSubmitted(true);
  };

  return (
    <div className="font-sans bg-white text-gray-900">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 py-4 shadow-md fixed w-full z-10">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Shabibsa</h1>
          <button
            onClick={toggleMobileMenu}
            className="text-white md:hidden focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <i className={`fas fa-${isMobileMenuOpen ? "times" : "bars"} text-2xl`} />
          </button>
          <ul className="hidden md:flex space-x-6">
            {["Home", "About Us", "FAQ", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className="text-white hover:text-blue-300 transition"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-blue-700 border border-white px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
              >
                Web Login
              </button>
            </li>
          </ul>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-800">
            <ul className="p-4 space-y-4">
              {["Home", "About Us", "FAQ", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "")}`}
                    className="text-white hover:text-blue-300 block"
                    onClick={closeMobileMenu}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    navigate("/login");
                    closeMobileMenu();
                  }}
                  className="bg-white text-blue-700 w-full py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
                >
                  Web Login
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 py-32 flex items-center justify-center text-center text-white">
          <div className="container mx-auto">
            <h1 className="text-5xl font-extrabold">
              WELCOME TO <span className="text-yellow-300">Shabibsa</span>
            </h1>
            <p className="mt-4 text-lg max-w-lg mx-auto">
              Seamlessly handle your financial obligations with Shabibsa.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="inline-block bg-white text-blue-700 border border-white px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="inline-block bg-blue-500 text-white border border-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Register
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-100" id="services">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-semibold text-blue-700">Our Expertise Field</h2>
            <p className="mt-2 text-gray-600">Explore our amazing services.</p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { title: "DATA BUNDLE", description: "Affordable browsing data bundles." },
                { title: "AIRTIME TOPUP", description: "Recharge safely at low rates." },
                { title: "TV SUBSCRIPTION", description: "Activate cable plans easily." },
                { title: "AIRTIME 2 CASH", description: "Convert airtime to cash." },
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition"
                >
                  <h4 className="text-2xl font-semibold text-blue-600">{service.title}</h4>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="py-20 bg-gray-50" id="contact">
          <div className="container mx-auto text-center">
            <h3 className="text-4xl font-semibold text-blue-700">Contact Us</h3>
            <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full p-3 bg-white text-gray-800 rounded-md border border-blue-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full p-3 bg-white text-gray-800 rounded-md border border-blue-400"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                className="w-full p-3 bg-white text-gray-800 rounded-md border border-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

