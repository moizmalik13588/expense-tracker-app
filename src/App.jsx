import React, { useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [cashIn, setCashIn] = useState(0);
  const [cashOut, setCashOut] = useState(0);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Cash IN");
  const [category, setCategory] = useState("");

  const cashInCategories = ["Salary", "Business", "Investment", "Loan"];
  const cashOutCategories = [
    "Groceries",
    "Fuel",
    "Food/Drink",
    "Car/Bike",
    "Taxi",
    "Clothes",
    "Shopping",
    "Entertainment",
    "Electricity",
  ];

  const handleAddTransaction = () => {
    if (!amount || !category) {
      alert("Please enter amount and select a category!");
      return;
    }

    const newTransaction = {
      type,
      amount: parseInt(amount),
      category,
      date: new Date().toLocaleDateString(),
    };

    setTransactions([...transactions, newTransaction]);

    if (type === "Cash IN") {
      setCashIn(cashIn + parseInt(amount));
    } else {
      setCashOut(cashOut + parseInt(amount));
    }

    // Reset inputs
    setAmount("");
    setCategory("");
  };

  const balance = cashIn - cashOut;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
        {/* Top Section */}
        <div className="flex justify-between mb-6">
          <div className="text-center">
            <h2 className="text-xl font-bold">Cash IN</h2>
            <p className="text-green-500">{cashIn}</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold">Cash OUT</h2>
            <p className="text-red-500">{cashOut}</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold">Balance</h2>
            <p className="text-blue-500">{balance}</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="flex items-center mb-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded flex-1 mr-2"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded flex-1 mr-2"
          >
            <option value="Cash IN">Cash IN</option>
            <option value="Cash OUT">Cash OUT</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded flex-1"
          >
            <option value="">Select Category</option>
            {(type === "Cash IN" ? cashInCategories : cashOutCategories).map(
              (item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              )
            )}
          </select>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddTransaction}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Add
        </button>

        {/* Transactions List */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Transactions</h3>
          <div className="max-h-60 overflow-y-auto">
            {transactions.map((item, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-50 p-2 mb-2 rounded shadow"
              >
                <p>{item.type}</p>
                <p>{item.date}</p>
                <p>{item.category}</p>
                <p>{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
