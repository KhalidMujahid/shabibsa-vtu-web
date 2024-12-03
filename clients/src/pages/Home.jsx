import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const App = () => {
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
    <div className="font-sans bg-gray-900 text-white">
      {/* Navbar */}
<nav className="bg-gray-800 py-4 shadow-md fixed w-full z-10 transition-all">
  <div className="container mx-auto px-6 flex justify-between items-center">
    <h1 className="text-3xl font-bold text-yellow-400">Shabibsa</h1>
    <button
      onClick={toggleMobileMenu}
      className="text-yellow-400 md:hidden focus:outline-none"
      aria-label="Toggle mobile menu"
    >
      <i className={`fas fa-${isMobileMenuOpen ? "times" : "bars"} text-2xl`} />
    </button>
    <ul className="hidden md:flex space-x-6">
      {["Home", "About Us", "FAQ", "Contact"].map((item) => (
        <li key={item}>
          <a
            href={`#${item.toLowerCase().replace(" ", "")}`}
            className="text-gray-300 hover:text-yellow-400 transition"
          >
            {item}
          </a>
        </li>
      ))}
      <li>
        <button
          onClick={() => navigate("/login")}
          className="text-yellow-400 border border-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-gray-800 transition"
        >
          Web Login
        </button>
      </li>
    </ul>
  </div>
  {isMobileMenuOpen && (
    <div className="md:hidden bg-gray-900 transition-all">
      <ul className="p-4 space-y-4">
        {["Home", "About Us", "FAQ", "Contact"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="text-gray-300 hover:text-yellow-400 block"
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
            className="text-yellow-400 border border-yellow-400 w-full py-2 rounded-md hover:bg-yellow-400 hover:text-gray-800 transition"
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
        <section className="bg-gradient-to-r from-yellow-400 to-orange-600 py-32 flex items-center justify-center text-center" id="home">
          <div className="container mx-auto">
            <h1 className="text-5xl font-extrabold text-white">
              WELCOME TO <span className="text-gray-900">Shabibsa</span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-lg mx-auto">
              Seamlessly handle your financial obligations with Shabibsa.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="inline-block bg-white text-yellow-600 border border-yellow-600 px-6 py-2 rounded-md hover:bg-yellow-100 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="inline-block bg-yellow-300 text-gray-800 border border-yellow-400 px-6 py-2 rounded-md hover:bg-yellow-400 transition"
              >
                Register
              </button>
            </div>
          </div>
        </section>
        
    {/* Testimonial Section */}
<section id="testimonials" className="py-20 bg-gray-900">
  <div className="container mx-auto px-4 text-center">
    <h3 className="text-4xl font-semibold text-yellow-400">What Our Customers Say</h3>
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        { name: "Jane D.", message: "Shabibsa has transformed the way I pay my bills. It's fast and reliable!" },
        { name: "Michael T.", message: "The customer support is excellent, and I always get the best value for my money." },
        { name: "Aisha K.", message: "Using Shabibsa has made it so easy for me to manage my utility payments." },
      ].map(({ name, message }, index) => (
        <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md hover:scale-105 transform transition">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-yellow-400">{name[0]}</span>
            </div>
          </div>
          <p className="text-gray-300">{`"${message}"`}</p>
          <h4 className="mt-4 font-semibold text-yellow-400">{`- ${name}`}</h4>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* Services Section */}
        <section className="py-20 bg-gray-800" id="services">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-semibold text-yellow-400">Our Expertise Field</h2>
            <p className="mt-2 text-gray-400">Explore our amazing services.</p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Service Items */}
              {[
                { title: "DATA BUNDLE", description: "Affordable browsing data bundles." },
                { title: "AIRTIME TOPUP", description: "Recharge safely at low rates." },
                { title: "TV SUBSCRIPTION", description: "Activate cable plans easily." },
                { title: "AIRTIME 2 CASH", description: "Convert airtime to cash." },
              ].map((service, index) => (
                <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md hover:scale-105 transition transform">
                  <h4 className="text-2xl font-semibold text-yellow-400">{service.title}</h4>
                  <p className="mt-2 text-gray-300">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="faq" class="py-20 bg-gray-800">
        <div class="container mx-auto px-4">
            <h3 class="text-4xl font-semibold text-yellow-400 text-center">FAQs</h3>
            <div class="mt-10 space-y-6">
                <div class="bg-gray-700 p-6 rounded-lg shadow-md">
                    <h4 class="text-xl font-semibold text-yellow-400">How do I register on Shabibsa?</h4>
                    <p class="mt-2 text-gray-300">Click the 'Register' button at the top of the page and fill out the required information to create an account.</p>
                </div>
                <div class="bg-gray-700 p-6 rounded-lg shadow-md">
                    <h4 class="text-xl font-semibold text-yellow-400">Is Shabibsa secure?</h4>
                    <p class="mt-2 text-gray-300">Yes, we use industry-standard security protocols to protect all transactions and user data.</p>
                </div>
                <div class="bg-gray-700 p-6 rounded-lg shadow-md">
                    <h4 class="text-xl font-semibold text-yellow-400">What services can I access with Shabibsa?</h4>
                    <p class="mt-2 text-gray-300">We offer data recharges, mobile top-ups, bill payments, TV subscriptions, and more.</p>
                </div>
            </div>
        </div>
    </section>

        {/* Contact Us Section */}
        <section className="py-20 bg-gray-900" id="contact">
          <div className="container mx-auto text-center">
            <h3 className="text-4xl font-semibold text-yellow-400">Contact Us</h3>
            <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full p-3 bg-gray-800 text-gray-300 rounded-md border border-gray-700"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full p-3 bg-gray-800 text-gray-300 rounded-md border border-gray-700"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                className="w-full p-3 bg-gray-800 text-gray-300 rounded-md border border-gray-700"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-yellow-500"
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

export default App;

