import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

const UserProfile = () => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      )
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    full_name: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name must be at most 50 characters")
      .required("Full name is required"),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .max(100, "Address must be at most 100 characters")
      .required("Address is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  const [initialValues, setinitialValues] = useState({
    username: "",
    email: "",
    full_name: "",
    address: "",
    password: "",
  });

  const router = useRouter();
  const user_id = Cookie.get('user_id');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const host = process.env.NEXT_PUBLIC_HOST;
        const api = `${host}/users/${user_id}`;
        const response = await fetch(api);
        const data = await response.json();

        if (response.status === 200) {
          setinitialValues({
            username: data.username,
            email: data.email,
            full_name: data.full_name,
            address: data.address,
            password: data.password,
          });
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching the user data.");
      }
    };

    fetchUserData();
  }, [user_id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateProfile(
        user_id,
        {
          username: values.username,
          email: values.email,
          full_name: values.full_name,
          address: values.address,
          password: values.password,}
      );
      alert("Profile updated successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("An error occurred while updating the user data.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-14 space-y-6 md:space-y-0 p-4 min-h-screen">
      <div className="w-full md:w-2/3 max-w-md mx-auto p-6 bg-white shadow shadow-slate-400 rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Edit Your Profile
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                />
                <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Field
                  type="text"
                  id="full_name"
                  name="full_name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                />
                <ErrorMessage name="full_name" component="div" className="text-red-600 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <Field
                  as="textarea"
                  id="address"
                  name="address"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                />
                <ErrorMessage name="address" component="div" className="text-red-600 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-700"
                />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  "Save Profile"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserProfile;
