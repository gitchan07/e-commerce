import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AddReduceQuantityButton = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1); 
  const router = useRouter();

  useEffect(() => {
    setQuantity(item.quantity || 1); 
  }, [item]);

  const removeItem = async () => {
    console.log(`Removing item: ${item.name}`);
    try {
      const response = await fetch('/api/remove-item', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: item.id })
      });

      if (response.ok) {
        
        router.push('/Cart');
      } else {
        console.error('Failed to remove item');
      }
    } catch (error) {
      console.error('An error occurred while removing the item:', error);
    }
  };

  const handleAdd = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const handleReduce = () => {
    setQuantity((currentQuantity) => {
      if (currentQuantity > 1) {
        return currentQuantity - 1;
      }
      return 1; // Ensure quantity does not go below 1
    });
    if (quantity === 1) {
      removeItem();
    }
  };

  return (
    <div className="flex items-center">
      <button onClick={handleReduce} className="bg-red-500 text-white px-2 py-1 rounded">-</button>
      <p className="mx-2">{quantity}</p>
      <button onClick={handleAdd} className="bg-green-500 text-white px-2 py-1 rounded">+</button>
    </div>
  );
};

export default AddReduceQuantityButton;
