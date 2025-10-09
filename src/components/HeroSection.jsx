"use client";
import React, { useEffect, useRef, useState } from "react";
import RegistrationForm from "@/components/RegistrationForm";

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
          if (
            computedStyle.display === "none" ||
            computedStyle.visibility === "hidden"
          ) {
            setTimeout(initVanta, 200);
            return;
          }

          console.log(
            "Initializing Vanta with dimensions:",
            rect.width,
            "x",
            rect.height
          );

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
            vantaRef.current.style.background =
              "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)";
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
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
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
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.rings.min.js";
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
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => {
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = "unset";
  };

  // Removed local RegistrationForm; using shared component instead

  // Mini Form Component for floating widget
  const MiniForm = () => {
    const [miniFormData, setMiniFormData] = useState({
      name: "",
      phone: "",
      email: "",
    });

    const handleMiniSubmit = () => {
      if (miniFormData.name && miniFormData.phone && miniFormData.email) {
        openPopup();
      }
    };

    const handleMiniChange = (e) => {
      const { name, value } = e.target;
      setMiniFormData((prev) => ({ ...prev, [name]: value }));
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
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)", // Fallback background
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
                  Level up your skills with{" "}
                  <span className="font-semibold text-red-600">
                    uGSOT Internship Challenge
                  </span>{" "}
                  and win enticing awards.
                </p>

                <div
                  className="mt-6 text-sm sm:text-base md:text-lg text-black space-y-2 animate-fade-in-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  <p>
                    <span className="font-semibold text-red-600">
                      Total Duration:
                    </span>{" "}
                    8 weeks
                  </p>
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
          isFormScrolledPast
            ? "opacity-100 visible scale-100"
            : "opacity-0 invisible scale-95"
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closePopup}
          ></div>

          <div className="relative z-10 w-full h-full md:h-auto md:max-w-2xl md:max-h-[90vh] overflow-y-auto overflow-x-hidden no-scrollbar md:rounded-2xl ">
            <div className="relative">
              <div className="transform animate-scale-in p-0 md:p-0">
                <RegistrationForm onClose={closePopup} />
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
