import { useState } from 'react';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleAddProduct = () => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setNewProduct({ name: '', price: '', description: '' });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Manage Products</h3>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Product Price"
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Add Product
        </button>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">Product List</h4>
        <ul>
          {products.map((product, index) => (
            <li key={index} className="border p-2 rounded mb-2">
              <h5 className="font-bold">{product.name}</h5>
              <p>{product.price}</p>
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageProduct;
