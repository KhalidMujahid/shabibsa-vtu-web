import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../services/baseURL";

function BuyData() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedDataPlan, setSelectedDataPlan] = useState("");
  const [phone, setPhone] = useState("");
  const [dataPlan, setDataPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pin, setPin] = useState("");

  const fetchPlans = async (network) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/plans/${network}`);
      const data = response.data;
      console.log(data.data);

      const dataPlansSet = new Set();
      const plans = [];

      for (const key in data.data) {
        dataPlansSet.add(key);
      }

      for (const planType of dataPlansSet) {
        data.data[planType].map((plan) => {
          const { plan_type, ...rest } = plan;
          plans.push(rest);
        });
      }

      setDataPlans([...dataPlansSet]);
      setPlans(plans);
      toast.success("Plans loaded successfully!", { position: "top-center" });
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to load plans. Please try again.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleNetworkChange = (e) => {
    const network = e.target.value;
    setSelectedNetwork(network);
    setSelectedPlan("");
    setSelectedDataPlan("");
    setPlans([]);
    if (network) fetchPlans(network);
  };

  const handlePurchase = () => {
    if (!selectedPlan || !phone) {
      toast.error("Please complete all fields before purchasing.", { position: "top-center" });
      return;
    }
    setShowModal(true);
  };

  const handleConfirmPurchase = async () => {
    try {
      const purchaseConfig = {
        method: "post",
        url: `https://datastationapi.com/api/user/`,
        headers: {
          Authorization: "Token 061fb06b4547e295018387a0c2eaadd178c9c6df",
          "Content-Type": "application/json",
        },
        data: {
          network: selectedNetwork,
          planId: selectedPlan,
          phone,
          pin,
        },
      };

      await axios(purchaseConfig);
      toast.success("Data purchase successful!", { position: "top-center" });

      setShowModal(false);
      setPin("");
      setPhone("");
      setSelectedNetwork("");
      setSelectedPlan("");
      setSelectedDataPlan("");
      setPlans([]);
    } catch (error) {
      console.error("Error purchasing data:", error);
      toast.error("Failed to purchase data. Please try again.", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      <ToastContainer />
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 flex items-center bg-gray-800 p-3 rounded-lg shadow hover:bg-gray-700 transition-all"
      >
        <span className="text-yellow-300 font-medium">&larr; Back</span>
      </button>
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Buy Data</h1>
      <div className="w-full max-w-md p-4 bg-gray-800 text-yellow-300 shadow-md rounded-lg">
        <label className="block font-medium mb-2">Select Network</label>
        <select
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md mb-4"
          onChange={handleNetworkChange}
          value={selectedNetwork}
        >
          <option value="">Select Network</option>
          <option value="MTN_PLAN">MTN</option>
          <option value="GLO_PLAN">GLO</option>
          <option value="AIRTEL_PLAN">Airtel</option>
          <option value="9MOBILE_PLAN">9Mobile</option>
        </select>

        <label className="block font-medium mb-2">Data Plan</label>
        <select
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md mb-4"
          onChange={(e) => setSelectedDataPlan(e.target.value)}
          value={selectedDataPlan}
        >
          <option value="">Select Data Plan</option>
          {dataPlan.map((planType, index) => (
            <option key={index} value={planType}>
              {planType}
            </option>
          ))}
        </select>

        <label className="block font-medium mb-2">Plan</label>
        {loading ? (
          <div className="flex justify-center items-center py-2">
            <span className="text-yellow-300">Loading plans...</span>
          </div>
        ) : (
          <select
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md mb-4"
            onChange={(e) => setSelectedPlan(e.target.value)}
            value={selectedPlan}
          >
            <option value="">Select Plan</option>
            {plans.map((plan, id) => (
              <option key={id} value={plan.id}>
                {"\u20A6"}
                {plan.plan_amount} - {plan.plan} ({plan.month_validate})
              </option>
            ))}
          </select>
        )}

        <label className="block font-medium mb-2">Enter Phone Number</label>
        <input
          type="text"
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md mb-4"
          placeholder="Enter Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handlePurchase}
          className="w-full bg-yellow-500 text-gray-900 py-2 rounded-md hover:bg-yellow-600"
        >
          Purchase Data
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 w-full max-w-sm rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Enter 4-Digit PIN</h2>
            <input
              type="password"
              maxLength="4"
              className="w-full p-3 bg-gray-900 text-yellow-300 border border-gray-700 rounded-lg text-center text-2xl tracking-widest mb-4"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleConfirmPurchase}
                className="w-full bg-yellow-500 text-gray-900 py-2 rounded-lg hover:bg-yellow-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-700 text-yellow-300 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyData;

