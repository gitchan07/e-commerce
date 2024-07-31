import React from 'react';

const DropdownList = ({ data, loading, error }) => {
  if (loading) return <div className="p-2">Loading...</div>;
  if (error) return <div className="p-2">Error: {error.message}</div>;

  return (
    <ul className="list-none p-2 m-0 ">
      {data && data.products.map((item) => (
        <li key={item.id} className="p-2 border-b hover:bg-gray-100">
          {item.title}
        </li>
      ))}
    </ul>
  );
};

export default DropdownList;
