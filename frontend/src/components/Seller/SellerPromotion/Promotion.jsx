import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getPromotions, createPromotion } from "@/services/promotionService";

const SellerPromotionInput = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    voucherCode: Yup.string().required("Voucher code is required"),
    valueDiscount: Yup.number()
      .min(1, "Value discount must be at least 1%")
      .max(100, "Value discount must be at most 100%")
      .required("Value discount is required"),
    description: Yup.string().required("Description is required"),
  });

  const initialValues = {
    voucherCode: "",
    valueDiscount: "",
    description: "",
  };

  useEffect(() => {
    fetchPromotions()
  }, [])

  const fetchPromotions = async () => {
    try {
      const data = await getPromotions();

      if (Array.isArray(data)) {
        setPromotions(data);
      } else {
        console.error("Data is not an array:", data);
      }

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const newPromotion = {
        voucher_code: values.voucherCode,
        value_discount: values.valueDiscount,
        description: values.description,
      };

      await createPromotion(newPromotion);
      alert('Promotion created successfully!');
      fetchPromotions()

    } catch (error) {
      console.error('Promotion creation error:', error);
      alert('An error occurred during promotion creation.');
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-black">Add Promotion</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="text-black">
            <div className="mb-4">
              <label className="block mb-2">Voucher Code</label>
              <Field
                type="text"
                name="voucherCode"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
              />
              <ErrorMessage
                name="voucherCode"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Value Discount (%)</label>
              <Field
                type="number"
                name="valueDiscount"
                className="border p-2 rounded w-full"
                min="1"
                max="100"
              />
              <ErrorMessage
                name="valueDiscount"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <Field
                type="text"
                name="description"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white p-2 rounded"
            >
              {isSubmitting ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                "Add Promotion"
              )}
            </button>
          </Form>
        )}
      </Formik>

      <h3 className="text-xl font-semibold mt-6 mb-4 text-black">Promotions</h3>
      <ul>
        {promotions.map((promo, index) => (
          <li key={index} className="border p-4 rounded mb-4 text-black">
            <pre>{JSON.stringify(promo, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerPromotionInput;
