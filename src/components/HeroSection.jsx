"use client";
import React, { useEffect, useRef, useState } from "react";

import RegistrationForm from "./RegistrationForm"; // Import your existing component

const HeroSection = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const heroSectionRef = useRef(null);
  const registrationRef = useRef(null);
  
  const [isSticky, setIsSticky] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    let threeLoaded = false;
    let vantaLoaded = false;

    // Function to initialize Vanta effect
    const initVanta = () => {
      if (
        threeLoaded &&
        vantaLoaded &&
        vantaRef.current &&
        window.VANTA &&
        !vantaEffect.current
      ) {
        try {
          // Ensure element has proper dimensions
          const element = vantaRef.current;
          if (element.offsetWidth === 0 || element.offsetHeight === 0) {
            setTimeout(initVanta, 100);
            return;
          }

          vantaEffect.current = window.VANTA.RINGS({
            el: element,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0xffffff,
            color: 0xe53e3e,
            color2: 0xff6b6b,
            size: 1.2,
            speed: 1.0,
            // Additional stability options
            forceAnimate: true,
            THREE: window.THREE
          });
        } catch (error) {
          console.log("Vanta effect initialization failed:", error);
        }
      }
    };

    // Load Three.js
    const loadThreeJS = () => {
      return new Promise((resolve) => {
        if (window.THREE) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
        script.onload = () => {
          threeLoaded = true;
          resolve();
        };
        script.onerror = () => {
          console.error("Failed to load Three.js");
          resolve(); // Don't block the component
        };
        document.head.appendChild(script);
      });
    };

    // Load Vanta.js Rings
    const loadVantaRings = () => {
      return new Promise((resolve) => {
        if (window.VANTA && window.VANTA.RINGS) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.rings.min.js";
        script.onload = () => {
          vantaLoaded = true;
          resolve();
        };
        script.onerror = () => {
          console.error("Failed to load Vanta Rings");
          resolve(); // Don't block the component
        };
        document.head.appendChild(script);
      });
    };

    // Load scripts sequentially
    const loadScripts = async () => {
      await loadThreeJS();
      await loadVantaRings();

      // Wait for DOM to be fully ready and element to have dimensions
      setTimeout(() => {
        if (vantaRef.current) {
          const rect = vantaRef.current.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            initVanta();
          } else {
            // Retry if element doesn't have dimensions yet
            setTimeout(initVanta, 200);
          }
        }
      }, 100);
    };

    loadScripts();

    // Cleanup function
    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (error) {
          console.log("Vanta cleanup error:", error);
        }
      }
    };
  }, []);

  // Scroll handler for sticky registration form
  useEffect(() => {
    const handleScroll = () => {
      if (!heroSectionRef.current || !registrationRef.current) return;

      const heroRect = heroSectionRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if hero section has been scrolled past
      const shouldBeSticky = heroRect.bottom <= windowHeight * 0.8;
      
      // Check if we're near the bottom of the page
      const isNearBottom = scrollY + windowHeight >= documentHeight - 200;
      
      setIsSticky(shouldBeSticky && !isNearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <section 
      ref={heroSectionRef}
      className="relative overflow-hidden min-h-screen"
    >
      {/* Vanta Background */}
      <div
        ref={vantaRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Overlay for better text readability */}
      <div
        className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-10 px-4 mx-auto py-16 sm:px-10 lg:px-10">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="relative">
            {/* Content backdrop */}
            <div className="absolute inset-0 transform bg-white bg-opacity-40 blur-3xl rounded-3xl -rotate-1"></div>

            <div className="relative z-10 p-8">
              {/* Fixed Main Heading */}
              <h1 className="mt-4 text-5xl font-bold leading-tight text-black lg:mt-6 sm:text-5xl xl:text-6xl animate-fade-in-up">
                IGNITE <br />
                <span className="text-transparent bg-clip-text bg-red-600 animate-pulse">
                  Internship Challenge <br />
                </span>{" "}
                by ugSOT
              </h1>

              {/* Subtitle Line */}
              <p className="mt-2 text-lg font-medium text-gray-700 sm:text-2xl animate-fade-in-up">
                relate it with the tech and non-tech
              </p>

              {/* Short description */}
              <p
                className="mt-4 text-base text-black lg:mt-6 sm:text-xl animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Dive into hands-on innovation with{" "}
                <span className="font-semibold text-red-600">uGSOT</span>,
                designed for Grade 11 & Grade 12 students.
              </p>

              {/* Dates and Format */}
              <div
                className="mt-6 text-black space-y-2 sm:text-lg animate-fade-in-up"
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
                {/* Eligibility */}
                <p
                  className="mt-6 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full inline-block animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  Open to students of Grades 11th & 12th Standard
                </p>

                {/* CTA */}
                <a
                  href="/"
                  title=""
                  className="inline-flex items-center px-8 py-4 mt-8 font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg bg-red-600 lg:mt-12 hover:from-red-600 hover:to-orange-600 focus:from-red-600 focus:to-orange-600 hover:scale-105 hover:shadow-xl animate-fade-in-up"
                  role="button"
                  style={{ animationDelay: "0.5s" }}
                >
                  Apply Now
                  <svg
                    className="w-6 h-6 ml-8 -mr-2 transition-transform duration-300 group-hover:translate-x-1"
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
                </a>
              </div>
            </div>
          </div>

          {/* Right side with your RegistrationForm component */}
          <div className={`relative animate-fade-in-right ${isSticky ? 'hidden' : ''}`}>
            <div className="relative z-10">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Registration Form */}
      <div
        ref={registrationRef}
        className={`
          fixed z-[100] transition-all duration-500 ease-in-out
          ${isSticky ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px] pointer-events-none'}
          ${isMinimized 
            ? 'w-10 h-10 top-16 right-1 sm:top-4 sm:right-4 md:top-4 md:right-2 lg:right-1 xl:right-0' 
            : 'top-16 right-1 sm:top-4 sm:right-4 md:top-4 md:right-2 lg:right-1 xl:right-0 w-[calc(100vw-0.5rem)] sm:w-[calc(100vw-2rem)] md:w-[420px] lg:w-[450px] xl:w-[500px]'
          }
        `}
      >
        {isMinimized ? (
          // Minimized state - just a floating button
          <button
            onClick={toggleMinimize}
            className="w-full h-full bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group"
          >
            <svg 
              className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          // Expanded state - registration form with minimize button in header
          <div className="scale-75 origin-top transform relative">
            {/* Minimize button positioned in the form's "Register Now!" area */}
            <button
              onClick={toggleMinimize}
              className="absolute top-4 right-6 z-10 w-6 h-6 bg-white hover:bg-gray-100 text-red-600 rounded-full flex items-center justify-center transition-colors shadow-md"
            >
              <svg 
                className="w-3 h-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
              </svg>
            </button>
            <RegistrationForm />
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        /* Custom scrollbar for the sticky form */
        .overflow-y-auto::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        
        .overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: transparent;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;