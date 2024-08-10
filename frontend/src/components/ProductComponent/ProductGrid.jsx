// components/ProductComponent/ProductGrid.jsx
import { useState } from 'react';

const products = [
  { name: 'Accessories', image: '/images/accecories.jpeg' },
  { name: 'Atomizer', image: '/images/atomizer.jpeg' },
  { name: 'Battery', image: '/images/baterai.jpeg' },
  { name: 'Device', image: '/images/device.jpeg' },
  { name: 'Liquid', image: '/images/liquid.jpeg' },
];

const ProductGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 4) % products.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 4 + products.length) % products.length);
  };

  const isNextDisabled = currentIndex + 4 >= products.length;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full p-4 flex justify-center">
        {products.slice(currentIndex, currentIndex + 4).map((product, index) => (
          <div key={index} className="w-1/4 p-2">
            <div className="border p-4 rounded-md shadow hover:shadow-lg transition-shadow duration-300">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-center">{product.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full max-w-md mt-4">
        <button onClick={handlePrevious} className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Previous</button>
        {!isNextDisabled && (
          <button onClick={handleNext} className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Next</button>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
