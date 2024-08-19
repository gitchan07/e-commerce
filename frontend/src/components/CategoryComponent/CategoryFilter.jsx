import React, { useState, useEffect, useContext } from "react";
import { getCategories } from "@/services/categoryService";
import CategoryButton from "./CategoryButton";
import { SearchContext } from "@/context/SearchProvider";

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSelectedCategoryId } = useContext(SearchContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(); // Fetching the categories
        console.log("Fetched data:", data); // Ensure data is logged and check its structure

        if (Array.isArray(data)) {
          setCategories(data); // Set categories only if it's an array
        } else {
          console.error("Data is not an array:", data);
        }

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error loading categories: {error.message}</p>;
  }

  return (
    <div>
      <CategoryButton data={categories} setId={setSelectedCategoryId} />
    </div>
  );
};

export default CategoryFilter;
