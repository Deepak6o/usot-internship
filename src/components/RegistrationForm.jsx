"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";

const RegistrationForm = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    userType: Yup.string()
      .oneOf(
        ["student", "parent"],
        "Please select if you are a student or parent"
      )
      .required("Please select user type"),
    completionYear: Yup.string().required("Please select year of completion"),
    schoolName: Yup.string()
      .min(2, "School name must be at least 2 characters")
      .required("School name is required"),
    referralCode: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      userType: "",
      completionYear: "",
      schoolName: "",
      referralCode: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log("Form submitted:", values);
      setTimeout(() => {
        alert("Registration submitted successfully!");
        setSubmitting(false);
        resetForm();
      }, 1000);
    },
  });

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen">
        {/* Left Side - Image */}
        <div className="items-center justify-center hidden p-8 lg:flex lg:w-1/2">
          <div className="max-w-4xl text-center">
            <img
              src="https://www.upgrad.com/_ww3-next/image/?url=https%3A%2F%2Fd2o2utebsixu4k.cloudfront.net%2FImage%201%20(2)-25d62fd834d141a9bbfe7ffb19e22bb9.webp&w=3840&q=75"
              alt="Education Platform"
              width={800}
              height={600}
              className="w-full h-auto mb-8 rounded-lg"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center w-full p-8 lg:w-1/2">
          <div className="w-full max-w-xl">
            <div className="overflow-hidden bg-white shadow-xl rounded-xl">
              {/* Header */}
              <div className="px-6 py-8 text-center bg-gradient-to-r from-red-600 to-red-600">
                <h1 className="mb-2 text-2xl font-bold text-white">
                  Register Now !
                </h1>
                <p className="text-red-100">4664 people registered</p>
              </div>

              {/* Form */}
              <div className="p-6">
                <form onSubmit={formik.handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        formik.errors.name && formik.touched.name
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {formik.errors.name && formik.touched.name && (
                      <div className="mt-1 text-sm text-red-500">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        formik.errors.email && formik.touched.email
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {formik.errors.email && formik.touched.email && (
                      <div className="mt-1 text-sm text-red-500">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        formik.errors.phone && formik.touched.phone
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter 10-digit phone number"
                    />
                    {formik.errors.phone && formik.touched.phone && (
                      <div className="mt-1 text-sm text-red-500">
                        {formik.errors.phone}
                      </div>
                    )}
                  </div>

                  {/* User Type Radio Buttons */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      You are a *
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="userType"
                          value="student"
                          checked={formik.values.userType === "student"}
                          onChange={formik.handleChange}
                          className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Student
                        </span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="userType"
                          value="parent"
                          checked={formik.values.userType === "parent"}
                          onChange={formik.handleChange}
                          className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Parent
                        </span>
                      </label>
                    </div>
                    {formik.errors.userType && formik.touched.userType && (
                      <div className="mt-1 text-sm text-red-500">
                        {formik.errors.userType}
                      </div>
                    )}
                  </div>

                  {/* Completion Year Dropdown */}
                  <div>
                    <label
                      htmlFor="completionYear"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      12th Year of Completion *
                    </label>
                    <select
                      id="completionYear"
                      name="completionYear"
                      value={formik.values.completionYear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        formik.errors.completionYear &&
                        formik.touched.completionYear
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select year of completion</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {formik.errors.completionYear &&
                      formik.touched.completionYear && (
                        <div className="mt-1 text-sm text-red-500">
                          {formik.errors.completionYear}
                        </div>
                      )}
                  </div>

                  {/* School Name Field */}
                  <div>
                    <label
                      htmlFor="schoolName"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      School Name *
                    </label>
                    <input
                      type="text"
                      id="schoolName"
                      name="schoolName"
                      value={formik.values.schoolName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        formik.errors.schoolName && formik.touched.schoolName
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your school name"
                    />
                    {formik.errors.schoolName && formik.touched.schoolName && (
                      <div className="mt-1 text-sm text-red-500">
                        {formik.errors.schoolName}
                      </div>
                    )}
                  </div>

                  {/* Referral Code Field */}
                  <div>
                    <label
                      htmlFor="referralCode"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Referral Code{" "}
                      <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="referralCode"
                      name="referralCode"
                      value={formik.values.referralCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter referral code if you have one"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
                      formik.isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {formik.isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                        Registering...
                      </div>
                    ) : (
                      "Register Now"
                    )}
                  </button>
                </form>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
