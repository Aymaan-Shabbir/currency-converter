import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown.jsx";
import { IoSwapHorizontalSharp } from "react-icons/io5";
// currency : api const host = 'https://api.frankfurter.app/currencies';
// conversion : https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
const InputBox = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const res = await fetch("https://api.frankfurter.app/currencies");
        const data = await res.json();
        setCurrencies(Object.keys(data));
      } catch (error) {
        console.error("Error fetching currencies", error);
      }
    };
    fetchCurrency();
  }, []);

  const currencyConvert = async () => {
    if (!amount) return setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("Error fetching currencies", error);
    } finally {
      setConverting(false);
    }
  };
  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-grey-800">
        CURRENCY CONVERTER
      </h2>
      <div className="flex items-center justify-between gap-5">
        <Dropdown
          currencies={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          title="From: "
        />
        <button
          onClick={swapCurrency}
          className="px-3 py-2 border border-white-900 bg-red-500  hover:bg-red-600 text-white font-bold text-lg rounded-full focus:outline-none focus:ring-2 focus:red-800 "
        >
          <IoSwapHorizontalSharp />
        </button>
        <Dropdown
          currencies={currencies}
          setCurrency={setToCurrency}
          currency={toCurrency}
          title="To: "
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-800"
        >
          Amount
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:indigo-800 mt-1"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={currencyConvert}
          className={`px-5 py-2 border border-white-900 bg-indigo-500  hover:bg-indigo-600 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:indigo-800${
            converting ? "animate-spin" : ""
          }`}
        >
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-red-500">
          Converted Amount : {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default InputBox;
