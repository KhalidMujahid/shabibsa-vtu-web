import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PriceList from "../components/PriceList";
import { FaClock } from 'react-icons/fa';

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
              WELCOME TO <span className="text-yellow-300">Shabibsa</span> Data
            </h1>
            <p className="mt-4 text-lg max-w-lg mx-auto">
              This is a telecommunication industry playing a major role in distribution, selling affordable and most cheapest data,airtime, DSTV,GOTV and Startime subscriptions.
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
          {/* to be changed*/}
            <h2 className="text-4xl font-semibold text-blue-700">Our Expertise Field</h2>
            <p className="mt-2 text-gray-600">Explore our amazing services.</p>
            
            <div className="container mx-auto text-center">
               <h2 className="text-4xl font-semibold text-blue-700">About Us</h2>
               <p className="mt-2 text-gray-600">We offer instant recharge of Airtime,Data bundle, cable TV(DSTV,GOTV and Startime) Electricity bill payment, Result checker (WAEC,NECO and NABTEB) E-PIN token and Airtime to cash.</p>
               <p className="mt-2 text-gray-600">In addition we use cutting-edge technology to run our services.Our data delivery and wallet funding is automated, Airtime top-up and data purchase are automated and get delivered to you almost instantly.</p>
            </div>
            
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-semibold text-blue-700">Secure Data</h2>
              <p className="mt-2 text-gray-600">We are a fully optimised platform. for reliablity and dependbility. we get 100% value for any transaction you carry with us.</p>
            </div>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { title: "DATA BUNDLE", description: "Enjoy more data to browse, chat and download your favourite video with Shabibsa Data bundle at affordable data plan." },
                { title: "AIRTIME TOPUP", description: "Get your Airtime instantly online from any network (MTN,GLO, 9Mobile, Airtel using Shabibsa." },
                { title: "TV SUBSCRIPTION", description: "You can make startimes, DSTV,GOTV subscriptions, with Shabibsa at any time." },
                { title: "Electricity Bill", description: "You don't have to be in darkness with Shabibsa you are covered." },
                { title: "Bulk Sms", description: "For your wedding, naming ceremony,birthday,walima, and other events. you are covered with Shabibsa" },
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
        
        
        {/* add data prices */}
        
        <PriceList />
        
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
            <div className="text-center bg-white shadow-lg rounded-lg p-6 max-w-md">
                <h5 className="text-4xl font-semibold text-blue-700 flex items-center justify-center">
                    <FaClock className="mr-2" />
                    24/7 Support
                </h5>
                <p className="mt-5 text-gray-600">
                    Our customers are premium to us, hence satisfaction is our topmost priority. Our customer service is just a click away.
                </p>
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

