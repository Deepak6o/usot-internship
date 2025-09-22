"use client";

import { useState } from "react";
import Image from "next/image";

export default function DalimNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scroll function
  const smoothScrollTo = (elementId) => {
    // Close mobile menu first
    setIsOpen(false);
    
    // Add a small delay to ensure the element is rendered
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        // Calculate offset for sticky navbar (adjust 80px as needed)
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        console.log(`Element with id "${elementId}" not found`);
      }
    }, 100);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="sticky top-0 z-50  bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={() => smoothScrollTo('hero')}>
                <Image
                  src="/assets/Logo.png" 
                  alt="Logo"
                  width={150}
                  height={50}
                  className="w-auto h-12 cursor-pointer"
                />
              </button>
            </div>

            {/* Navigation Links */}
            {/* <div className="hidden md:block">
              <div className="flex items-baseline ml-10 space-x-8">
                <button 
                  onClick={() => smoothScrollTo('hero')}
                  className="relative px-3 py-2 text-lg font-medium text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button 
                  onClick={() => smoothScrollTo('introduction')}
                  className="relative px-3 py-2 text-lg font-medium text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group"
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button 
                  onClick={() => smoothScrollTo('why-attend')}
                  className="relative px-3 py-2 text-lg font-medium text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group"
                >
                  Benefits
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button 
                  onClick={() => smoothScrollTo('session')}
                  className="relative px-3 py-2 text-lg font-medium text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group"
                >
                  Sessions
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                 <button 
                  onClick={() => smoothScrollTo('hero')}
                  className="relative px-3 py-2 text-lg font-medium text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group"
                >
                  Register
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            </div> */}

            {/* Mobile menu button */}
            {/* <div className="md:hidden">
              <button
                type="button"
                className="text-gray-600 hover:text-black focus:outline-none focus:text-black transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div> */}
          </div>

          {/* Mobile menu */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <button 
                onClick={() => smoothScrollTo('hero')}
                className="relative block w-full text-left px-3 py-2 text-lg font-medium text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group"
              >
                Home
                <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-16"></span>
              </button>
              <button 
                onClick={() => smoothScrollTo('introduction')}
                className="relative block w-full text-left px-3 py-2 text-lg font-medium text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group"
              >
                About
                <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-16"></span>
              </button>
              <button 
                onClick={() => smoothScrollTo('why-attend')}
                className="relative block w-full text-left px-3 py-2 text-lg font-medium text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group"
              >
                Benefits
                <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-20"></span>
              </button>
              <button 
                onClick={() => smoothScrollTo('session')}
                className="relative block w-full text-left px-3 py-2 text-lg font-medium text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group"
              >
                Sessions
                <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-20"></span>
              </button>
              <button 
                onClick={() => smoothScrollTo('hero')}
                className="relative block w-full text-left px-3 py-2 text-lg font-medium text-gray-600 hover:text-red-600 transition-colors duration-300 cursor-pointer group"
              >
                Register
                <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-20"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}