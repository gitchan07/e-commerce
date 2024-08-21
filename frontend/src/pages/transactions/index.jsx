import React, { useEffect, useState } from "react";
import { fetchSellerTransactions } from "@/services/cartService";
import Cookies from "js-cookie";

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const userId = Cookies.get("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSellerTransactions(userId);
        if (response && Array.isArray(response.transactions)) {
          setTransactions(response.transactions);
        } else {
          console.error("Expected an array but got:", response);
        }
      } catch (error) {
        console.error("Error fetching seller transactions:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions on your table</h1>
      {transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Transaction Number
                </th>
                <th className="py-4 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="py-4 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="py-4 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="py-4 px-6 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 text-black"
                >
                  <td className="py-4 px-6 text-left">
                    {transaction.transaction_number}
                  </td>
                  <td className="py-4 px-6 text-left">{transaction.product}</td>
                  <td className="py-4 px-6 text-left">
                    {transaction.quantity}
                  </td>
                  <td className="py-4 px-6 text-left">
                    Rp. {transaction.total_price_item} ,00
                  </td>
                  <td className="py-4 px-6 text-left">
                    {transaction.transaction_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No transactions available.</p>
      )}
    </div>
  );
};

export default Index;
