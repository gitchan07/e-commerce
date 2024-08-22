import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { getCategories } from "@/services/categoryService";
import Cookies from "js-cookie";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    category_id: Yup.string().required("Category name is required"),
    price: Yup.number()
      .min(0, "Price must be a positive number")
      .required("Price is required"),
    stock: Yup.number()
      .min(0, "Stock must be a positive number")
      .required("Stock is required"),
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be at most 100 characters")
      .required("Title is required"),
    image: Yup.mixed().required("Image file is required"),
  });

  const initialValues = {
    category_id: "",
    price: "",
    stock: "",
    title: "",
    image: null,
  };

  const router = useRouter();

  useEffect(() => {
    
    fetchCategories();
  }, []);
  
  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (err) {
      setError(err);
    }
  };
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const host = process.env.NEXT_PUBLIC_HOST;
      const api = `${host}/products/`;

      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      const response = await fetch(api, {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${Cookies.get("access_token")}`
        }
      });

      const data = await response.json();

      if (response.status === 201) {
        router.push('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Product creation error:', error);
      alert('An error occurred during product creation.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-14 space-y-6 md:space-y-0 p-4 min-h-screen">
      <div className="w-full md:w-2/3 max-w-md mx-auto p-6 bg-white shadow shadow-slate-400 rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Create a New Product
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="category_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <Field
                  as="select"
                  id="category_id"
                  name="category_id"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                >
                  <option ></option>
                  {categories.length > 0 && (
                    categories.map((category, index) => (
                      <option key={index} value={category.id}>{category.name}</option>
                    ))
                  )}
                </Field>
                <ErrorMessage
                  name="category_id"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock
                </label>
                <Field
                  type="number"
                  id="stock"
                  name="stock"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image File
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Create Product"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProduct;
