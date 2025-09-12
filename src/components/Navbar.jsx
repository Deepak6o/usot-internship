"use client";

import { useState } from "react";
import Image from "next/image";

export default function DalimNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <nav className="sticky top-0 z-50 border-b shadow-lg bg-white/70 backdrop-blur-xl border-white/20 shadow-black/5">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="#">
                <Image
                  src="/assets/Logo.png" // ✅ Public folder path
                  alt="Logo"
                  width={150}
                  height={50}
                  className="w-auto h-12"
                />
              </a>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="flex items-baseline ml-10 space-x-8">
                <a href="#products" className="px-3 py-2 text-lg font-medium text-gray-600 hover:text-black">
                  Products
                </a>
                <a href="#designs" className="px-3 py-2 text-lg font-medium text-gray-600 hover:text-black">
                  Designs
                </a>
                <a href="#pricing" className="px-3 py-2 text-lg font-medium text-gray-600 hover:text-black">
                  Pricing
                </a>
                <a href="#about" className="px-3 py-2 text-lg font-medium text-gray-600 hover:text-black">
                  About
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-600 hover:text-black focus:outline-none focus:text-black"
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
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <a href="#products" className="block px-3 py-2 text-lg font-medium text-gray-600 hover:text-black">
                Products
              </a>
              <a href="#designs" className="block px-3 py-2 text-lg font-medium text-gray-600 hover:text-black">
                Designs
              </a>
              <a href="#pricing" className="block px-3 py-2 text-lg font-medium text-gray-600 hover:text-black">
                Pricing
              </a>
              <a href="#about" className="block px-3 py-2 text-lg font-medium text-gray-600 hover:text-black">
                About
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
