"use client";

import React from "react";

const RegistrationForm = () => {
  // List of 28 Indian states
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
  ];

  // Mock Formik-like functionality for the artifact environment
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    schoolName: "",
    standard: "",
    state: "",
  });

  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Validation function
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        return "";
      case 'phone':
        if (!value.trim()) return "Phone number is required";
        if (!/^[0-9]{10}$/.test(value)) return "Phone number must be 10 digits";
        return "";
      case 'email':
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address";
        return "";
      case 'schoolName':
        if (!value.trim()) return "School name is required";
        if (value.length < 2) return "School name must be at least 2 characters";
        return "";
      case 'standard':
        if (!value) return "Please select your standard";
        return "";
      case 'state':
        if (!value) return "Please select your state";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    const newTouched = {};
    
    Object.keys(formData).forEach(key => {
      newTouched[key] = true;
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    
    // If no errors, submit
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      console.log("Form submitted:", formData);
      
      setTimeout(() => {
        alert("Registration submitted successfully!");
        setIsSubmitting(false);
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          schoolName: "",
          standard: "",
          state: "",
        });
        setErrors({});
        setTouched({});
      }, 1000);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="flex items-center justify-center w-full ">
        <div className="w-full max-w-xl">
          <div className="overflow-hidden bg-white shadow-lg rounded-xl">
            {/* Header */}
            <div className="px-6 py-6 text-center bg-gradient-to-r from-red-600 to-red-600">
              <h1 className="mb-1 text-xl font-bold text-white">Register Now !</h1>
              <p className="text-sm text-red-100">4664 people registered</p>
            </div>

            {/* Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Field */}
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.name && touched.name ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && touched.name && (
                    <div className="mt-1 text-xs text-red-500">{errors.name}</div>
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
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.phone && touched.phone ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter 10-digit phone number"
                  />
                  {errors.phone && touched.phone && (
                    <div className="mt-1 text-xs text-red-500">{errors.phone}</div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.email && touched.email ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && touched.email && (
                    <div className="mt-1 text-xs text-red-500">{errors.email}</div>
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
                    value={formData.schoolName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.schoolName && touched.schoolName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter your school name"
                  />
                  {errors.schoolName && touched.schoolName && (
                    <div className="mt-1 text-xs text-red-500">{errors.schoolName}</div>
                  )}
                </div>

                {/* Standard */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Standard *</label>
                  <div className="flex space-x-6">
                    <label className="flex items-center cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="standard"
                        value="11th"
                        checked={formData.standard === "11th"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                      <span className="ml-2">11th</span>
                    </label>
                    <label className="flex items-center cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="standard"
                        value="12th"
                        checked={formData.standard === "12th"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                      <span className="ml-2">12th</span>
                    </label>
                  </div>
                  {errors.standard && touched.standard && (
                    <div className="mt-1 text-xs text-red-500">{errors.standard}</div>
                  )}
                </div>

                {/* State */}
                <div>
                  <label htmlFor="state" className="block mb-1 text-sm font-medium text-gray-700">
                    State *
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors.state && touched.state ? "border-red-300" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select your state</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && touched.state && (
                    <div className="mt-1 text-xs text-red-500">{errors.state}</div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white transition-all duration-200 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 transform hover:scale-105 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
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