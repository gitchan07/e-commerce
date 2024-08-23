import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ListCardItem from "./ListCardItem";
import { SearchContext } from "@/context/SearchProvider";
import CategoryFilter from "../CategoryComponent/CategoryFilter";

const ProductsPage = () => {
  const { searchTerm, selectedProductId, selectedCategoryId } =
    useContext(SearchContext);
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
        const params = {
          page: page,
          per_page: perPage,
        };

        if (searchTerm) {
          params.title = searchTerm;
        } else if (selectedProductId) {
          params.id = selectedProductId;
        } else if (selectedCategoryId) {
          params.category_id = selectedCategoryId;
        }

        const response = await axios.get(api, {
          headers: {
            "Content-Type": "application/json",
          },
          params,
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
  }, [page, searchTerm, selectedProductId, selectedCategoryId]);

  useEffect(() => {
    const prefetchNextPage = async () => {
      if (page < totalPages) {
        await axios.get(api, {
          params: { page: page + 1, per_page: perPage },
        });
      }
    };
    if (!loading && page < totalPages && page > 1) {
      prefetchNextPage();
    }
  }, [page, totalPages]);

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
            <CategoryFilter />
      <h1 className="text-3xl font-bold my-6 text-center text-black">Products</h1>

      <ListCardItem products={products} />
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

export default ProductsPage;
