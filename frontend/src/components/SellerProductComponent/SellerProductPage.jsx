import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerProductList from "./SellerProductList";
import Cookies from "js-cookie";

const SellerProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const host = process.env.NEXT_PUBLIC_HOST;
  const api = `${host}/products/my-products`;
  const perPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(api, {
          params: {
            page: page,
            per_page: perPage,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    console.log(error);
    return (
      <p className="text-center text-red-500">
        Error fetching products: {error.message}
      </p>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold my-6 text-center">My Products</h1>

      <SellerProductList products={products} />
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 hover:bg-blue-600 transition duration-200"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`px-4 py-2 rounded ${
              page === index + 1
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } transition duration-200`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 hover:bg-blue-600 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SellerProductPage;
