import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SellerPromotionInput = () => {
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

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const newPromotion = {
      voucher_code: values.voucherCode,
      value_discount: values.valueDiscount,
      description: values.description,
    };
    setPromotions((prevPromotions) => [...prevPromotions, newPromotion]);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Add Promotion</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block mb-2">Voucher Code</label>
              <Field
                type="text"
                name="voucherCode"
                className="border p-2 rounded w-full"
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

      <h3 className="text-xl font-semibold mt-6 mb-4">Promotions</h3>
      <ul>
        {promotions.map((promo, index) => (
          <li key={index} className="border p-4 rounded mb-4">
            <pre>{JSON.stringify(promo, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerPromotionInput;
