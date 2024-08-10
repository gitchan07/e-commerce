import { useState, useEffect } from 'react';

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Fetch sales data from an API or database
    const fetchData = async () => {
      const data = await fetch('/api/sales').then((res) => res.json());
      setSalesData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Sales Analytics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {salesData.map((data, index) => (
          <div key={index} className="border p-4 rounded">
            <h4 className="font-bold">{data.month}</h4>
            <p>Total Sales: {data.totalSales}</p>
            <p>Orders: {data.orders}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesAnalytics;
