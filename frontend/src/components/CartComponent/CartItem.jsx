import React from 'react';
import AddReduceQuantityButton from './BehaviourComponent/AddReduceQuantityButton';

const CartItem = ({ item }) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
      <div className="flex-grow text-black">
        <h4 className="font-semibold">{item.name}</h4>
        <p>{item.description}</p>
        <p>Rp. {item.price}</p>
      </div>
      <AddReduceQuantityButton item={item} />
    </div>
  );
};

export default CartItem;
