import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const ProductEditForm = ({ productId }) => {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    categoryName: '',
    quantity: 0,
    price: 0.0,
    stock: 0,
    title: '',
    imgPath: null,
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
            categoryName: data.categoryName,
            quantity: data.quantity,
            price: data.price,
            stock: data.stock,
            title: data.title,
            imgPath: data.img_path,
          });
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        alert('An error occurred while fetching the product data.');
      }
    };

    fetchProductData();
  }, [productId]);

  const validationSchema = Yup.object({
    categoryName: Yup.string().required('Category name is required'),
    quantity: Yup.number().required('Quantity is required').min(0, 'Quantity must be a positive number'),
    price: Yup.number().required('Price is required').min(0, 'Price must be a positive number'),
    stock: Yup.number().required('Stock is required').min(0, 'Stock must be a positive number'),
    title: Yup.string().required('Title is required'),
    imgPath: Yup.mixed()
      .required('An image file is required')
      .test("fileSize", "File too large", (value) => !value || (value && value.size <= 2000000)) // 2MB limit
      .test("fileType", "Unsupported file format", (value) =>
        !value || (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const host = process.env.NEXT_PUBLIC_HOST;
      const api = `${host}/products/${productId}`;

      const formData = new FormData();
      formData.append("categoryName", values.categoryName);
      formData.append("quantity", values.quantity);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("title", values.title);
      if (values.imgPath) {
        formData.append("image", values.imgPath);
      }

      const response = await fetch(api, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (response.status === 200) {
        alert('Product updated successfully!');
        router.push(`/products/${productId}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Product update error:', error);
      alert('An error occurred during product update.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-14 space-y-6 md:space-y-0 p-4 min-h-screen bg-white">
      <div className="w-full md:w-2/3 max-w-md mx-auto p-6 bg-white shadow shadow-slate-400 rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
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
              <div className="mb-4">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <Field
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                />
                <ErrorMessage
                  name="categoryName"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                />
                <ErrorMessage
                  name="quantity"
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
                  htmlFor="imgPath"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <input
                  id="imgPath"
                  name="imgPath"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                  onChange={(event) => {
                    setFieldValue("imgPath", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="imgPath"
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
                    "Save Changes"
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

export default ProductEditForm;
