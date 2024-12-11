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
    <div className="min-h-screen flex flex-col items-center bg-white-900 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center py-2 px-4 bg-white-800 text-sky-300 rounded-lg shadow hover:bg-white-700 transition-all mb-6"
      >
        <span className="text-sky-400 font-medium">Back</span>
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-sky-400 mb-6">Transaction History</h1>

      {/* Search Bar */}
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search Transactions"
          className="w-full p-3 rounded-lg bg-white-800 text-sky-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Transactions Table */}
      <div className="w-full max-w-2xl overflow-x-auto">
        <table className="w-full bg-white-800 text-sky-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4 text-right">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={
                    transaction.type === "credit"
                      ? "bg-gray-800 hover:bg-green-700"
                      : "bg-gray-800 hover:bg-red-700"
                  }
                >
                  <td className="p-4">{transaction.date}</td>
                  <td className="p-4">{transaction.description}</td>
                  <td className="p-4 text-right">
                    {transaction.type === "credit"
                      ? `+${transaction.amount.toFixed(2)} USD`
                      : `-${transaction.amount.toFixed(2)} USD`}
                  </td>
                  <td className="p-4 text-right capitalize">{transaction.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New Transaction Button */}
      <button
        onClick={() => alert("New transaction form goes here")}
        className="mt-8 py-3 px-6 bg-gradient-to-r from-sky-500 to-sky-600 text-sky-900 font-semibold rounded-lg shadow hover:shadow-lg transition-all"
      >
        New Transaction
      </button>
    </div>
  );
}

export default Transaction;

