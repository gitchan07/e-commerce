import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { updateProduct, deleteProduct } from "@/services/productService";
import { getCategories } from "@/services/categoryService";

const ProductEditForm = ({ productId }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [initialValues, setInitialValues] = useState({
    category_id: "",
    quantity: 0,
    price: 0.0,
    stock: 0,
    title: "",
    imgPath: null,
    is_active: true,
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const host = process.env.NEXT_PUBLIC_HOST;
        const api = `${host}/products/${productId}`;
        const response = await fetch(api);
        const data = await response.json();

        if (response.status === 200) {
          setInitialValues({
            category_id: data.category_id,
            quantity: data.quantity,
            price: data.price,
            stock: data.stock,
            title: data.title,
            imgPath: data.img_path,
            is_active: data.is_active,
          });
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert("An error occurred while fetching the product data.");
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProductData();
    fetchCategories();
  }, [productId]);

  const validationSchema = Yup.object({
    category_id: Yup.string().required("Category is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(0, "Quantity must be a positive number"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be a positive number"),
    stock: Yup.number()
      .required("Stock is required")
      .min(0, "Stock must be a positive number"),
    title: Yup.string().required("Title is required"),
    imgPath: Yup.mixed()
      .test(
        "fileSize",
        "File too large",
        (value) => !value || (value && value.size <= 2000000)
      ) // 2MB limit
      .test(
        "fileType",
        "Unsupported file format",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(
              value.type
            ))
      ),

    is_active: Yup.boolean().required("Status is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateProduct(
        productId,
        {
          category_id: values.category_id,
          quantity: values.quantity,
          price: values.price,
          stock: values.stock,
          title: values.title,
          is_active: values.is_active,
        },
        values.imgPath
      );

      alert("Product updated successfully!");
      router.push(`/products/${productId}`);
    } catch (error) {
      console.error("Product update error:", error);
      alert("An error occurred during product update.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      alert("Product deleted successfully!");
      router.push("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred during product deletion.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-14 space-y-6 md:space-y-0 p-4 min-h-screen bg-gray-100">
      <div className="w-full md:w-2/3 max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg text-black">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Edit Product
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mb-5">
                <label
                  htmlFor="category_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <Field
                  as="select"
                  id="category_id"
                  name="category_id"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="category_id"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <Field
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-5">
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
                  step="0.01"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-5">
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
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-5">
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
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="imgPath"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  id="imgPath"
                  name="imgPath"
                  accept="image/jpeg, image/png, image/gif"
                  onChange={(event) => {
                    setFieldValue("imgPath", event.currentTarget.files[0]);
                  }}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
                <ErrorMessage
                  name="imgPath"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-5">
  <label className="block text-sm font-medium text-gray-700">Status</label>
  <div className="flex items-center mt-2">
    <input
      type="radio"
      id="is_active_true"
      name="is_active"
      value={true}
      className="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
    />
    <label
      htmlFor="is_active_true"
      className="ml-2 text-sm text-gray-700"
    >
      Active
    </label>
  </div>
  <div className="flex items-center mt-2">
    <input
      type="radio"
      id="is_active_false"
      name="is_active"
      value={false}
      className="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
    />
    <label
      htmlFor="is_active_false"
      className="ml-2 text-sm text-gray-700"
    >
      Inactive
    </label>
  </div>
  <ErrorMessage
    name="is_active"
    component="div"
    className="text-red-600 text-sm mt-1"
  />
</div>


              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-medium rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  {isSubmitting && (
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                  )}
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Product
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductEditForm;
