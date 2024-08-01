import React, { useEffect } from 'react';
import useFetch from '@/hooks/utils/useFetch';
import CartItem from './CartItem';

const Cart = ({ setCartTotal, api }) => {
  const { data: items, error, loading } = useFetch(api);

  useEffect(() => {
    if (items) {
      const total = items.reduce((sum, item) => sum + item.price, 0);
      setCartTotal(total);
    }
  }, [items, setCartTotal]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error: {error.message}</p>;

  return (
    <div className="flex-grow p-4 bg-white rounded shadow">
      {items && items.length > 0 ? (
        items.map(item => <CartItem key={item.id} item={item} />)
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
