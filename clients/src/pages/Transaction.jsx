import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Transaction() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-10-30", description: "Grocery Shopping", amount: -50, type: "debit" },
    { id: 2, date: "2024-10-29", description: "Salary", amount: 1500, type: "credit" },
    { id: 3, date: "2024-10-28", description: "Utilities", amount: -100, type: "debit" },
    { id: 4, date: "2024-10-27", description: "Online Sale", amount: 200, type: "credit" },
    { id: 5, date: "2024-10-26", description: "Transportation", amount: -30, type: "debit" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 py-2 px-4 bg-gray-200 text-gray-600 rounded-lg shadow hover:bg-gray-300 transition-all mb-8"
        >
          <span className="text-lg font-medium">← Back</span>
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Transaction History</h1>

        {/* Search Bar */}
        <div className="w-full max-w-md mb-8">
          <input
            type="text"
            placeholder="Search Transactions..."
            className="w-full p-4 bg-white border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Transactions List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`p-6 rounded-lg shadow hover:shadow-md transition ${
                  transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {transaction.description}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{transaction.date}</p>
                <p
                  className={`text-xl font-bold mt-4 ${
                    transaction.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.type === "credit"
                    ? `+${transaction.amount.toFixed(2)} USD`
                    : `-${transaction.amount.toFixed(2)} USD`}
                </p>
                <p className="text-sm text-gray-500 capitalize mt-2">
                  Type: {transaction.type}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No transactions found.
            </p>
          )}
        </div>

        {/* New Transaction Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => alert("New transaction form goes here")}
            className="py-3 px-6 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-lg shadow hover:shadow-lg transition"
          >
            New Transaction
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transaction;

