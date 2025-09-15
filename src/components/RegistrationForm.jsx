"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

const RegistrationForm = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    userType: Yup.string().oneOf(["student", "parent"], "Please select if you are a student or parent").required("Please select user type"),
    completionYear: Yup.string().required("Please select year of completion"),
    schoolName: Yup.string().min(2, "School name must be at least 2 characters").required("School name is required"),
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
<div className="flex min-h-[80vh] items-center justify-center">
      {/* Left Side - Image */}
<div className="hidden lg:flex lg:w-1/3 items-center justify-center">
        <img
          src="/assets/reg.png"
          alt="Education Platform"
          className="object-cover w-full h-full rounded-l-xl"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full p-6 lg:w-1/2">
        <div className="w-full max-w-lg">
          <div className="overflow-hidden bg-white shadow-lg rounded-xl">
            {/* Header */}
            <div className="px-6 py-6 text-center bg-gradient-to-r from-red-600 to-red-600">
              <h1 className="mb-1 text-xl font-bold text-white">Register Now !</h1>
              <p className="text-sm text-red-100">4664 people registered</p>
            </div>

            {/* Form */}
            <div className="p-6">
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formik.errors.name && formik.touched.name ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formik.errors.name && formik.touched.name && (
                    <div className="mt-1 text-xs text-red-500">{formik.errors.name}</div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formik.errors.email && formik.touched.email ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter your email address"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="mt-1 text-xs text-red-500">{formik.errors.email}</div>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formik.errors.phone && formik.touched.phone ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter 10-digit phone number"
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <div className="mt-1 text-xs text-red-500">{formik.errors.phone}</div>
                  )}
                </div>

                {/* User Type */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">You are a *</label>
                  <div className="flex space-x-6">
                    <label className="flex items-center cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="userType"
                        value="student"
                        checked={formik.values.userType === "student"}
                        onChange={formik.handleChange}
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                      <span className="ml-2">Student</span>
                    </label>
                    <label className="flex items-center cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="userType"
                        value="parent"
                        checked={formik.values.userType === "parent"}
                        onChange={formik.handleChange}
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                      <span className="ml-2">Parent</span>
                    </label>
                  </div>
                  {formik.errors.userType && formik.touched.userType && (
                    <div className="mt-1 text-xs text-red-500">{formik.errors.userType}</div>
                  )}
                </div>

                {/* Completion Year */}
                <div>
                  <label htmlFor="completionYear" className="block mb-1 text-sm font-medium text-gray-700">
                    12th Year of Completion *
                  </label>
                  <select
                    id="completionYear"
                    name="completionYear"
                    value={formik.values.completionYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formik.errors.completionYear && formik.touched.completionYear ? "border-red-300" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {formik.errors.completionYear && formik.touched.completionYear && (
                    <div className="mt-1 text-xs text-red-500">{formik.errors.completionYear}</div>
                  )}
                </div>

                {/* School Name */}
                <div>
                  <label htmlFor="schoolName" className="block mb-1 text-sm font-medium text-gray-700">
                    School Name *
                  </label>
                  <input
                    type="text"
                    id="schoolName"
                    name="schoolName"
                    value={formik.values.schoolName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      formik.errors.schoolName && formik.touched.schoolName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter your school name"
                  />
                  {formik.errors.schoolName && formik.touched.schoolName && (
                    <div className="mt-1 text-xs text-red-500">{formik.errors.schoolName}</div>
                  )}
                </div>

                {/* Referral Code */}
                <div>
                  <label htmlFor="referralCode" className="block mb-1 text-sm font-medium text-gray-700">
                    Referral Code <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="referralCode"
                    name="referralCode"
                    value={formik.values.referralCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter referral code"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white transition-all duration-200 ${
                    formik.isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-indigo-700 transform hover:scale-105 shadow-md hover:shadow-lg"
                  }`}
                >
                  {formik.isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
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
  );
};

export default RegistrationForm;
