"use client";
import React, { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isFormScrolledPast, setIsFormScrolledPast] = useState(false);
  const [vantaReady, setVantaReady] = useState(false);

  useEffect(() => {
    let threeLoaded = false;
    let vantaLoaded = false;
    let initAttempts = 0;
    const maxInitAttempts = 10;

    const initVanta = () => {
      if (initAttempts >= maxInitAttempts) {
        console.log("Max Vanta initialization attempts reached");
        return;
      }

      initAttempts++;

      if (
        threeLoaded &&
        vantaLoaded &&
        vantaRef.current &&
        window.VANTA &&
        window.VANTA.RINGS &&
        !vantaEffect.current
      ) {
        try {
          const element = vantaRef.current;
          const rect = element.getBoundingClientRect();
          
          // More thorough dimension checking
          if (rect.width === 0 || rect.height === 0 || !element.offsetParent) {
            setTimeout(initVanta, 200);
            return;
          }

          // Ensure element is visible and has computed styles
          const computedStyle = window.getComputedStyle(element);
          if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
            setTimeout(initVanta, 200);
            return;
          }

          console.log("Initializing Vanta with dimensions:", rect.width, "x", rect.height);

          vantaEffect.current = window.VANTA.RINGS({
            el: element,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: Math.max(200, rect.height),
            minWidth: Math.max(200, rect.width),
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0xffffff,
            color: 0xe53e3e,
            color2: 0xff6b6b,
            size: 1.2,
            speed: 1.0,
            forceAnimate: true,
            THREE: window.THREE,
          });

          console.log("Vanta effect initialized successfully");
          setVantaReady(true);
        } catch (error) {
          console.error("Vanta effect initialization failed:", error);
          // Try alternative background if Vanta fails
          if (vantaRef.current) {
            vantaRef.current.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
          }
        }
      } else {
        // Log what's missing
        if (!threeLoaded) console.log("Three.js not loaded");
        if (!vantaLoaded) console.log("Vanta.js not loaded");
        if (!vantaRef.current) console.log("Vanta ref not available");
        if (!window.VANTA) console.log("VANTA not available");
        if (!window.VANTA?.RINGS) console.log("VANTA.RINGS not available");
        
        setTimeout(initVanta, 200);
      }
    };

    const loadThreeJS = () => {
      return new Promise((resolve) => {
        if (window.THREE) {
          threeLoaded = true;
          resolve();
          return;
        }
        
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
        script.onload = () => {
          threeLoaded = true;
          console.log("Three.js loaded successfully");
          resolve();
        };
        script.onerror = (error) => {
          console.error("Failed to load Three.js:", error);
          threeLoaded = false;
          resolve();
        };
        document.head.appendChild(script);
      });
    };

    const loadVantaRings = () => {
      return new Promise((resolve) => {
        if (window.VANTA && window.VANTA.RINGS) {
          vantaLoaded = true;
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.rings.min.js";
        script.onload = () => {
          vantaLoaded = true;
          console.log("Vanta Rings loaded successfully");
          resolve();
        };
        script.onerror = (error) => {
          console.error("Failed to load Vanta Rings:", error);
          vantaLoaded = false;
          resolve();
        };
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await loadThreeJS();
        await loadVantaRings();

        // Wait for DOM to be fully ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initVanta, 300);
          });
        } else {
          setTimeout(initVanta, 300);
        }
      } catch (error) {
        console.error("Error loading scripts:", error);
      }
    };

    loadScripts();

    // Cleanup function
    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
          vantaEffect.current = null;
          console.log("Vanta effect destroyed");
        } catch (error) {
          console.error("Vanta cleanup error:", error);
        }
      }
    };
  }, []);

  // Resize handler to reinitialize Vanta if needed
  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect.current && vantaRef.current) {
        try {
          vantaEffect.current.resize();
        } catch (error) {
          console.error("Vanta resize error:", error);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldBeScrolled = scrollPosition > 300;

      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }

      // Check if main registration form is completely scrolled past
      const formSection = document.querySelector(".registration-form-section");
      if (formSection) {
        const formRect = formSection.getBoundingClientRect();
        const isFormCompletelyPast = formRect.bottom < 0;
        
        if (isFormCompletelyPast !== isFormScrolledPast) {
          setIsFormScrolledPast(isFormCompletelyPast);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once to set initial state
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, isFormScrolledPast]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToForm = () => {
    const formSection = document.querySelector(".registration-form-section");
    if (formSection) {
      formSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.6,
        behavior: "smooth",
      });
    }
  };

  const openPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = 'unset';
  };

  // Registration Form Component
  const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      schoolName: "",
      standard: "",
      city: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        case "email":
          if (!value.trim()) return "Email is required";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Invalid email address";
          return "";
        case "schoolName":
          if (!value.trim()) return "School name is required";
          if (value.length < 2) return "School name must be at least 2 characters";
          return "";
        case "standard":
          if (!value) return "Please select your standard";
          return "";
        case "city":
          if (!value.trim()) return "City name is required";
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

    const handleSubmit = () => {
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
        setIsSubmitting(true);
        console.log("Form submitted:", formData);
        setTimeout(() => {
          alert("Registration submitted successfully!");
          setIsSubmitting(false);
          setFormData({
            name: "",
            phone: "",
            email: "",
            schoolName: "",
            standard: "",
            city: "",
          });
          setErrors({});
          setTouched({});
          closePopup();
        }, 1000);
      }
    };

    return (
      <div className="w-full max-w-lg">
        <div className="overflow-hidden bg-white shadow-lg rounded-xl">
          <div className="px-4 py-4 text-center bg-gradient-to-r from-red-600 to-red-600">
            <h1 className="mb-1 text-lg sm:text-xl font-bold text-white">
              Register Now !
            </h1>
            {/* <p className="text-xs sm:text-sm text-red-100">
              4664 people registered
            </p> */}
          </div>

          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block mb-1 text-sm sm:text-base font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.name && touched.name ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.name && touched.name && (
                  <div className="mt-1 text-xs text-red-500">{errors.name}</div>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm sm:text-base font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter 10-digit phone number"
                  className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.phone && touched.phone ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.phone && touched.phone && (
                  <div className="mt-1 text-xs text-red-500">{errors.phone}</div>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm sm:text-base font-medium text-gray-700">
                  Email ID *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email address"
                  className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.email && touched.email ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="mt-1 text-xs text-red-500">{errors.email}</div>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm sm:text-base font-medium text-gray-700">
                  School Name *
                </label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your school name"
                  className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.schoolName && touched.schoolName ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.schoolName && touched.schoolName && (
                  <div className="mt-1 text-xs text-red-500">{errors.schoolName}</div>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm sm:text-base font-medium text-gray-700">
                  Standard *
                </label>
                <div className="flex sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0">
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
                  <div className="mt-1 text-xs text-red-500">{errors.standard}</div>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm sm:text-base font-medium text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your city name"
                  className={`w-full px-2 py-1.5 sm:px-3 sm:py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.city && touched.city ? "border-red-300" : "border-gray-300"
                  }`}
                />
                {errors.city && touched.city && (
                  <div className="mt-1 text-xs text-red-500">{errors.city}</div>
                )}
              </div>

              <button
                onClick={handleSubmit}
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
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mini Form Component for floating widget
  const MiniForm = () => {
    const [miniFormData, setMiniFormData] = useState({
      name: "",
      phone: "",
      email: ""
    });

    const handleMiniSubmit = () => {
      if (miniFormData.name && miniFormData.phone && miniFormData.email) {
        openPopup();
      }
    };

    const handleMiniChange = (e) => {
      const { name, value } = e.target;
      setMiniFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
      <div 
        className="bg-white rounded-xl shadow-2xl p-3 w-72 border border-gray-100 cursor-pointer"
        onClick={openPopup}
      >
        <div className="text-center mb-2">
          <h3 className="text-sm font-bold text-gray-800">Quick Register</h3>
          <p className="text-xs text-gray-600">Fill to complete registration</p>
        </div>
        
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            value={miniFormData.name}
            onChange={handleMiniChange}
            placeholder="Name"
            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer"
            readOnly
          />
          <input
            type="tel"
            name="phone"
            value={miniFormData.phone}
            onChange={handleMiniChange}
            placeholder="Phone"
            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer"
            readOnly
          />
          <input
            type="email"
            name="email"
            value={miniFormData.email}
            onChange={handleMiniChange}
            placeholder="Email"
            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer"
            readOnly
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              openPopup();
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 px-3 rounded-md transition-all duration-300 transform hover:scale-105"
          >
            Complete Registration →
          </button>
        </div>
        
        <div className="flex items-center justify-center mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"></div>
            {/* <span>4664 registered</span> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="relative overflow-hidden min-h-screen">
        <div
          ref={vantaRef}
          className="absolute inset-0 w-full h-full"
          style={{ 
            zIndex: 0,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', // Fallback background
          }}
        />

        <div
          className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"
          style={{ zIndex: 1 }}
        />

        <div className="relative z-10 px-4 mx-auto py-10 sm:px-6 md:px-8 lg:px-10 xl:px-16">
          <div className="grid items-center grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="absolute inset-0 transform bg-white bg-opacity-40 blur-3xl rounded-3xl -rotate-1"></div>

              <div className="relative z-10 p-4 sm:p-6 lg:p-8">
                <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-black animate-fade-in-up">
                  IGNITE <br />
                  <span className="text-transparent bg-clip-text bg-red-600 animate-pulse">
                    Internship Challenge <br />
                  </span>{" "}
                  by uGSOT
                </h1>

               

                <p
                  className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-black animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  Dive into hands-on innovation with{" "}
                  <span className="font-semibold text-red-600">uGSOT</span>,
                  designed for Grade 11 & Grade 12 students.
                </p>

                <div
                  className="mt-6 text-sm sm:text-base md:text-lg text-black space-y-2 animate-fade-in-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  <p>
                    <span className="font-semibold text-red-600">Starts:</span>{" "}
                    [Insert Date & Time]
                  </p>
                  <p>
                    <span className="font-semibold text-red-600">Ends:</span>{" "}
                    [Insert Date & Time]
                  </p>
                  <p>
                    <span className="font-semibold text-red-600">Mode:</span>{" "}
                    Online
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <p
                    className="mt-6 text-xs sm:text-sm md:text-base font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full inline-block animate-fade-in-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    Open to students of Grades 11th & 12th Standard
                  </p>

                  <button
                    onClick={openPopup}
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 mt-6 md:mt-8 font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg bg-red-600 hover:from-red-600 hover:to-orange-600 focus:from-red-600 focus:to-orange-600 hover:scale-105 hover:shadow-xl animate-fade-in-up"
                    style={{ animationDelay: "0.5s" }}
                  >
                    Apply Now
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 ml-4 sm:ml-8 -mr-2 transition-transform duration-300 group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="relative registration-form-section">
              <div className="relative z-10">
                <RegistrationForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Mini Form - Desktop (Only show when main form is completely scrolled past) */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-500 ease-in-out hidden md:block ${
          isFormScrolledPast ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
        }`}
      >
        <MiniForm />
      </div>

      {/* Sticky Registration Button - Mobile (Only show when main form is completely scrolled past) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out md:hidden ${
          isFormScrolledPast
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-full"
        }`}
      >
        <div className="bg-white border-t border-gray-200 shadow-2xl px-1 py-1">
          <button
            onClick={scrollToForm}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="text-sm sm:text-lg font-bold">Register Now</span>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closePopup}
          ></div>
          
          <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closePopup}
                className="absolute -top-2 -right-2 z-20 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="transform animate-scale-in">
                <RegistrationForm />
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default HeroSection;