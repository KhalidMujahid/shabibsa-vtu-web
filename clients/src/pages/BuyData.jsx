import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
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
  
  let networks = ["MTN","AIRTEL","GLO","9MOBILE"];
  
  const fetchPlans = async (network) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/plans/${network}`);
      const data = response.data;
      setDataPlans(data.plans);
      toast.success("Plans loaded successfully!", { position: "top-center" });
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to load plans. Please try again.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const fetchDataPlans = async () => {
    if (!selectedNetwork || !selectedDataPlan) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/plans/${selectedNetwork}/${selectedDataPlan}`);
      const data = response.data.plan;
      setPlans(data);
      toast.success("Data plans loaded successfully!", { position: "top-center" });
    } catch (error) {
      console.error("Error fetching data plans:", error);
      toast.error("Failed to load data plans. Please try again.", { position: "top-center" });
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
    setDataPlans([]);
    if (network) {
      fetchPlans(network);
    }
  };

  const handleDataPlanChange = (e) => {
    const dataPlan = e.target.value;
    setSelectedDataPlan(dataPlan);
    fetchDataPlans();
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
        url: `${baseURL}/data/buy`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          provider: selectedNetwork,
          planId: selectedPlan,
          phone,
          pin,
        },
      };
  
      const response = await axios(purchaseConfig);
      toast.success("Data purchase successful!", { position: "top-center" });
  
      setShowModal(false);
      setPin("");
      setPhone("");
      setSelectedNetwork("");
      setSelectedPlan("");
      setSelectedDataPlan("");
      setPlans([]);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || "An error occurred. Please try again.";
        toast.error(errorMessage, { position: "top-center" });
      } else {
        toast.error("An unexpected error occurred.", { position: "top-center" });
      }
    }
  };
  
  useEffect(() => {
    if (selectedNetwork && selectedDataPlan) {
      fetchDataPlans();
    }
  }, [selectedNetwork, selectedDataPlan]);

  // Find the selected plan data based on selectedPlan
  const selectedPlanData = plans.find((plan) => plan.planId === selectedPlan);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <ToastContainer />
      <button
        onClick={() => navigate("/dashboard")}
        className="self-start mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Buy Data</h1>
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <label className="block text-blue-700 font-medium mb-2">Select Network</label>
        <select
          className="w-full p-3 bg-white border border-blue-500 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleNetworkChange}
          value={selectedNetwork}
        >
          <option value="">Select Network</option>
          <option value="1">MTN</option>
          <option value="2">Airtel</option>
          <option value="3">GLO</option>
          <option value="4">9Mobile</option>
        </select>

        <label className="block text-blue-700 font-medium mb-2">Data Plan</label>
        <select
          className="w-full p-3 bg-white border border-blue-500 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleDataPlanChange}
          value={selectedDataPlan}
        >
          <option value="">Select Data Plan</option>
          {dataPlan.map((plan,index) => (
            <option key={index} value={plan.planId}>
              {plan.planType}
            </option>
          ))}
        </select>

        <label className="block text-blue-700 font-medium mb-2">Plan</label>
        {loading ? (
          <div className="flex justify-center items-center py-2">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-200 h-6 w-6"></div>
          </div>
        ) : (
          <select
            className="w-full p-3 bg-white border border-blue-500 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSelectedPlan(e.target.value)}
            value={selectedPlan}
          >
            <option value="">Select Plan</option>
            {plans.map((plan,index) => (
              <option key={index} value={plan.planId}>
                {plan.planName} - ₦{plan.amount}
              </option>
            ))}
          </select>
        )}

        <label className="block text-blue-700 font-medium mb-2">Enter Phone Number</label>
        <input
          type="text"
          className="w-full p-3 bg-white border border-blue-500 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handlePurchase}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Purchase Data
        </button>
      </div>

      <div className="mt-16 text-gray-500 text-center">
        <p className="text-lg">
          Use this to check your balance: *323*2#, *310#, *461*4#, or *460*261#.
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Confirm Your Details</h2>
            <div className="text-left mb-4">
              <p className="text-blue-700"><strong>Network: </strong> {networks[selectedNetwork - 1] || "N/A"}</p>
              {/* <p className="text-blue-700"><strong>Data Plan: </strong> {dataPlan[selectedDataPlan].planType || "N/A"}</p> */}
              <p className="text-blue-700"><strong>Plan Amount: </strong>
                {`₦${selectedDataPlan}` || "N/A"}
              </p>
              <p className="text-blue-700"><strong>Phone Number:</strong> {phone || "N/A"}</p>
            </div>
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Enter 4-Digit PIN</h2>
            <input
              type="password"
              maxLength="4"
              className="w-full p-3 bg-white text-blue-700 border border-blue-400 rounded-lg text-center text-2xl tracking-widest mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleConfirmPurchase}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-blue-600 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
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
