import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListCardItem from './ListCardItem';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const host = process.env.NEXT_PUBLIC_HOST;
  const api = `${host}/products`;
  const perPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(api, {
          params: {
            page: page,
            per_page: perPage,
          },
        });

        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / perPage));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ListCardItem products={products} />

      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`px-4 py-2 rounded ${
              page === index + 1
                ? 'bg-blue-700 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
