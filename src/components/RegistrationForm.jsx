"use client";

import React from "react";

const RegistrationForm = ({ onClose }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    parentPhone: "",
    email: "",
    schoolName: "",
    standard: "",
    residentialAddress: "",
    pincode: ["", "", "", "", "", ""],
  });

  const pincodeRefs = React.useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^[0-9]{10}$/.test(value)) return "Phone number must be 10 digits";
        return "";
      case "parentPhone":
        if (!value.trim()) return "Parent's phone number is required";
        if (!/^[0-9]{10}$/.test(value))
          return "Parent's phone number must be 10 digits";
        if (value === formData.phone)
          return "Parent's phone must be different from student's phone";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email address";
        return "";
      case "schoolName":
        if (!value.trim()) return "School name is required";
        if (value.length < 2)
          return "School name must be at least 2 characters";
        return "";
      case "standard":
        if (!value) return "Please select your standard";
        return "";
      case "residentialAddress":
        if (!value.trim()) return "Residential address is required";
        if (value.length < 10) return "Please provide a complete address";
        return "";
      case "pincode":
        const pincodeString = Array.isArray(value) ? value.join("") : value;
        if (!pincodeString.trim()) return "Pincode is required";
        if (!/^[0-9]{6}$/.test(pincodeString))
          return "Pincode must be 6 digits";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[RegistrationForm] submit clicked", formData);
    const newErrors = {};
    const newTouched = {};
    Object.keys(formData).forEach((key) => {
      newTouched[key] = true;
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setIsSubmitting(true);
        console.log("[RegistrationForm] posting to /api/registration");
        const response = await fetch("/api/registration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
          }),
        });

        console.log("[RegistrationForm] response status", response.status);
        const data = await response.json();
        console.log("[RegistrationForm] response body", data);
        if (!response.ok || !data?.success) {
          throw new Error(data?.error || "Failed to submit");
        }

        setShowSuccess(true);
        setFormData({
          name: "",
          phone: "",
          parentPhone: "",
          email: "",
          schoolName: "",
          standard: "",
          residentialAddress: "",
          pincode: ["", "", "", "", "", ""],
        });
        setErrors({});
        setTouched({});
      } catch (err) {
        setErrorMessage(
          err.message || "Something went wrong. Please try again."
        );
        setShowError(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-2 sm:px-4">
      {(showSuccess || showError) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px] modal-overlay-fade"
            onClick={() => {
              setShowSuccess(false);
              setShowError(false);
            }}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md text-center modal-enter">
            <div
              className={`mx-auto mb-3 h-14 w-14 rounded-full flex items-center justify-center ${
                showSuccess ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {showSuccess ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-green-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.59a.75.75 0 1 0-1.06-1.06l-4.72 4.72-1.78-1.78a.75.75 0 1 0-1.06 1.06l2.31 2.31c.293.293.767.293 1.06 0l5.25-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-red-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm-1.72 6.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 0 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <h3 className="text-lg font-bold mb-1">
              {showSuccess ? "Registration successful!" : "Submission failed"}
            </h3>
            <p className="text-gray-600 text-sm mb-5">
              {showSuccess
                ? "We have received your details."
                : errorMessage || "Please try again."}
            </p>
            <div className="grid grid-cols-1 gap-3">
              {showError && (
                <button
                  onClick={() => {
                    setShowError(false);
                  }}
                  className="w-full py-2 px-4 rounded-lg text-white bg-red-600 hover:bg-red-700"
                >
                  Close
                </button>
              )}
              {showSuccess && (
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-2 px-4 rounded-lg text-white bg-red-600 hover:bg-red-700"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="w-full max-w-lg">
        <div className="overflow-hidden bg-white shadow-lg rounded-xl">
          {/* Header */}
          <div className="relative px-4 py-4 text-center bg-gradient-to-r from-red-600 to-red-600">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <h1 className="mb-1 text-lg sm:text-xl font-bold text-white">
              Register Now !
            </h1>
            <p className="text-xs sm:text-sm text-red-100">
              4664 people registered
            </p>
          </div>

          {/* Form */}
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm sm:text-base font-medium text-gray-700"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.name && touched.name
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {errors.name && touched.name && (
                  <div className="mt-1 text-xs text-red-500">{errors.name}</div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-1 text-sm sm:text-base font-medium text-gray-700"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter 10-digit phone number"
                  className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.phone && touched.phone
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {errors.phone && touched.phone && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Parent Phone */}
              <div>
                <label
                  htmlFor="parentPhone"
                  className="block mb-1 text-sm sm:text-base font-medium text-gray-700"
                >
                  Parent's Phone Number *
                </label>
                <input
                  type="tel"
                  id="parentPhone"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter parent's 10-digit phone number"
                  className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.parentPhone && touched.parentPhone
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {errors.parentPhone && touched.parentPhone && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.parentPhone}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm sm:text-base font-medium text-gray-700"
                >
                  Email ID *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email address"
                  className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.email && touched.email
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* School Name */}
              <div>
                <label
                  htmlFor="schoolName"
                  className="block mb-1 text-sm sm:text-base font-medium text-gray-700"
                >
                  School Name *
                </label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your school name"
                  className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.schoolName && touched.schoolName
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {errors.schoolName && touched.schoolName && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.schoolName}
                  </div>
                )}
              </div>

              {/* Standard */}
              <div>
                <label className="block mb-1 text-sm sm:text-base font-medium text-gray-700">
                  Standard *
                </label>
                <div className="flex  sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0">
                  <label className="flex items-center cursor-pointer text-sm sm:text-base">
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
                  <label className="flex ml-10 items-center cursor-pointer text-sm sm:text-base">
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
                  <div className="mt-1 text-xs text-red-500">
                    {errors.standard}
                  </div>
                )}
              </div>

              {/* Residential Address */}
              <div>
                <label
                  htmlFor="residentialAddress"
                  className="block mb-1 text-sm sm:text-base font-medium text-gray-700"
                >
                  Residential Address *
                </label>
                <textarea
                  id="residentialAddress"
                  name="residentialAddress"
                  value={formData.residentialAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your complete residential address"
                  rows="3"
                  className={`w-full px-2 py-1.5 sm:px-3 sm:py-1.5 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 resize-none ${
                    errors.residentialAddress && touched.residentialAddress
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {errors.residentialAddress && touched.residentialAddress && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.residentialAddress}
                  </div>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="block mb-1 text-sm sm:text-base font-medium text-gray-700">
                  Pincode *
                </label>
                <div
                  className="flex gap-2"
                  onPaste={(e) => {
                    const pasted = (
                      e.clipboardData.getData("text") || ""
                    ).replace(/\D/g, "");
                    if (pasted.length === 6) {
                      e.preventDefault();
                      const digits = pasted.split("").slice(0, 6);
                      setFormData((prev) => ({ ...prev, pincode: digits }));
                      setErrors((prev) => ({
                        ...prev,
                        pincode: validateField("pincode", digits),
                      }));
                      const last = pincodeRefs.current[5]?.current;
                      if (last) last.focus();
                    }
                  }}
                >
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      ref={pincodeRefs.current[index]}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      value={formData.pincode[index]}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "");
                        const value = raw.slice(-1);
                        const newPincode = [...formData.pincode];
                        newPincode[index] = value;
                        setFormData((prev) => ({
                          ...prev,
                          pincode: newPincode,
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          pincode: validateField("pincode", newPincode),
                        }));
                        if (value && index < 5) {
                          setTimeout(() => {
                            pincodeRefs.current[index + 1]?.current?.focus();
                          }, 0);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          const newPincode = [...formData.pincode];
                          if (newPincode[index]) {
                            newPincode[index] = "";
                            setFormData((prev) => ({
                              ...prev,
                              pincode: newPincode,
                            }));
                            setErrors((prev) => ({
                              ...prev,
                              pincode: validateField("pincode", newPincode),
                            }));
                          } else if (index > 0) {
                            pincodeRefs.current[index - 1]?.current?.focus();
                          }
                        }
                      }}
                      onFocus={(e) => e.target.select()}
                      maxLength="1"
                      className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ${
                        errors.pincode && touched.pincode
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                  ))}
                </div>
                {errors.pincode && touched.pincode && (
                  <div className="mt-1 text-xs text-red-500 text-center">
                    {errors.pincode}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-lg text-sm sm:text-base font-medium text-white transition-all duration-200 ${
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
  );
};

export default RegistrationForm;
