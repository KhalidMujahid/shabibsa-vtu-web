import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PriceList from "../components/PriceList";
import { FaClock, FaMobileAlt, FaWifi, FaTv, FaBolt, FaSms } from "react-icons/fa";

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
          <h1 className="text-2xl font-bold text-white">ShabibsaData</h1>
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
            <h2 className="text-3xl md:text-5xl font-semibold">
              WELCOME <br /> <span className="text-yellow-300">Shabibsa</span> Data
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-lg md:text-xl">
              We are a telecommunication industry playing a major role in the distribution and sale of affordable data, airtime, DSTV, GOTV, and Startime subscriptions.
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

        {/* About Us Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 text-white" id="aboutus">
          <div className="container mx-auto text-center px-6">
            <h2 className="text-4xl font-semibold text-white mb-6">About Us</h2>
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-3xl mx-auto">
              <p className="text-lg text-gray-700">
                We offer instant recharge for Airtime, Data bundles, Cable TV (DSTV, GOTV, and Startime), Electricity bill payments, and Result checkers (WAEC, NECO, NABTEB). Additionally, we provide cutting-edge technology for running our services, ensuring fast, reliable, and convenient access to these essential services.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50" id="services">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-semibold text-blue-700">Our Expertise</h2>
            <p className="mt-2 text-lg text-gray-600">Explore our amazing services that we offer with top-notch quality and reliability.</p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {[{ title: "Data Bundles", description: "Affordable data plans for browsing, chatting, and downloading.", icon: <FaWifi size={30} className="text-blue-600" /> },
              { title: "Airtime Top-up", description: "Instant top-up for all major networks.", icon: <FaMobileAlt size={30} className="text-blue-600" /> },
              { title: "TV Subscriptions", description: "Subscription services for DSTV, GOTV, and Startime.", icon: <FaTv size={30} className="text-blue-600" /> },
              { title: "Electricity Bill", description: "Pay your electricity bills instantly.", icon: <FaBolt size={30} className="text-blue-600" /> },
              { title: "Bulk SMS", description: "Bulk messaging for events like weddings, birthdays, and more.", icon: <FaSms size={30} className="text-blue-600" /> }].map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-500 ease-in-out hover:shadow-2xl hover:translate-y-3"
                >
                  <div className="flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-blue-600">{service.title}</h4>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Price List */}
        <PriceList />

        {/* 24/7 Support Section */}
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
          <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 p-6 rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl max-w-md mx-auto">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-white p-4 rounded-full shadow-md">
                <FaClock className="text-blue-600 text-4xl" />
              </div>
            </div>
            <h5 className="text-3xl font-semibold text-white text-center mb-3">
              24/7 Support
            </h5>
            <p className="text-lg text-white text-center">
              We prioritize customer satisfaction. Our support team is always available for assistance, anytime, anywhere.
            </p>
            <div className="mt-6 text-center">
              <button className="bg-white text-blue-700 px-6 py-2 rounded-md shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300">
                Contact Support
              </button>
            </div>
          </div>
        </div>

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
                className="w-full p-3 bg-white text-gray-800 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full p-3 bg-white text-gray-800 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                className="w-full p-3 bg-white text-gray-800 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
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