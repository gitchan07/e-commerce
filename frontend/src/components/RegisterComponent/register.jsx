import React from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Register = ({ onToggleForm }) => {
  const router = useRouter();

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
    fullName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Full name can only contain letters and spaces")
      .matches(
        /^[A-Z][a-zA-Z]*(\s[A-Z][a-zA-Z]*)*$/,
        "Full name must start with a capital letter for each word"
      )
      .required("Full name is required"),
    address: Yup.string().required("Address is required"),
    role: Yup.string().required("Role is required"),
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

  const initialValues = {
    username: "",
    email: "",
    fullName: "",
    address: "",
    role: "seller",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const host = process.env.NEXT_PUBLIC_HOST;
      const api = `${host}/users/register`;

      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          full_name: values.fullName,
          address: values.address,
          role: values.role,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert("User created successfully");
        onToggleForm();
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-14 space-y-6 md:space-y-0 p-4 min-h-screen">
      <div className="w-full md:w-1/3 flex items-center max-w-md justify-center">
        <Image
          src="/images/vapor-vault-logo.png"
          alt="Vapor Vault Logo"
          width={350}
          height={350}
          className="rounded-lg"
        />
      </div>
      <div className="w-full md:w-2/3 max-w-md mx-auto p-6 bg-white shadow shadow-slate-400 rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Sign Up Now
        </h1>
        <h3 className="text-center text-gray-800 mb-6">
          Already have a Vapor Vault account? 
          <a
            className="text-emerald-600 hover:underline underline-offset-2 cursor-pointer"
            onClick={onToggleForm}
          >
            Login
          </a>
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="text-black">
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <Field
                  type="text"
                  id="role"
                  name="role"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  "Register"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
