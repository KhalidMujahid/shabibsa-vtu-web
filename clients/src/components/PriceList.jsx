import { FaShoppingCart } from 'react-icons/fa';

const PriceList = () => {
  const data = [
    {
      carrier: "MTN DATA",
      image: "https://datastationapi.com/assetsfolder/img/mtn.png",
      plans: [
        { data: "150.0MB", price: "₦50.0", duration: "30 days" },
        { data: "250.0MB", price: "₦72.5", duration: "30 days" },
        { data: "500.0MB", price: "₦121.5", duration: "Monthly" },
        { data: "1.0GB", price: "₦220.0", duration: "1 day" },
        // More plans...
      ]
    },
    {
      carrier: "AIRTEL DATA",
      image: "https://datastationapi.com/assetsfolder/img/airtel.png",
      plans: [
        { data: "100.0MB", price: "₦55.0", duration: "14 days" },
        { data: "300.0MB", price: "₦105.0", duration: "14 days" },
        { data: "500.0MB", price: "₦136.0", duration: "30 days" },
        { data: "1.0GB", price: "₦215.0", duration: "2 days" },
        // More plans...
      ]
    },
    {
      carrier: "GLO DATA",
      image: "https://datastationapi.com/assetsfolder/img/glo.png",
      plans: [
        { data: "200.0MB", price: "₦55.0", duration: "14 days" },
        { data: "500.0MB", price: "₦132.5", duration: "30 days" },
        { data: "1.0GB", price: "₦187.0", duration: "1 day" },
        { data: "2.0GB", price: "₦280.0", duration: "2 days" },
        // More plans...
      ]
    },
    {
      carrier: "9MOBILE DATA",
      image: "https://datastationapi.com/assetsfolder/img/9mobile.png",
      plans: [
        { data: "500.0MB", price: "₦80.0", duration: "30 days" },
        { data: "1.0GB", price: "₦150.0", duration: "30 days" },
        { data: "1.5GB", price: "₦227.0", duration: "30 days" },
        { data: "2.0GB", price: "₦300.0", duration: "30 days" },
        // More plans...
      ]
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((carrier, index) => (
          <div key={index} className="shadow-lg p-4 bg-white rounded-lg">
            <div className="text-center">
              <img src={carrier.image} alt={carrier.carrier} width="100" height="100" className="mx-auto mb-4" />
              <b><span className="text-black">{carrier.carrier}</span></b>
              <div className="pricing-text mb-5">
                {carrier.plans.map((plan, idx) => (
                  <div key={idx} className="mb-3">
                    <span className="block">{plan.data}</span>
                    <span className="text-lg font-bold">{plan.price}</span>
                    <span className="block text-sm text-gray-500">{plan.duration}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="inline-block py-2 w-100 px-6 text-white bg-indigo-600 rounded-full hover:bg-indigo-700">
                Purchase <FaShoppingCart size="10" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceList;

