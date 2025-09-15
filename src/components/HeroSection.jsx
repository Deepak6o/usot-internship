import React from "react";

const HeroSection = () => {
  return (
    <section className="relative py-10 overflow-hidden sm:py-16 lg:py-24">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "grid-move 15s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="relative">
            {/* Content backdrop */}
            <div className="absolute inset-0 transform bg-white bg-opacity-40 blur-3xl rounded-3xl -rotate-1"></div>

            <div className="relative z-10 p-8">
              {/* Fixed Main Heading */}
              <h1 className="mt-4 text-4xl font-bold leading-tight text-black lg:mt-6 sm:text-6xl xl:text-7xl animate-fade-in-up">
                uGSOT D.R.I.P.{" "}
                <span className="text-transparent bg-clip-text bg-red-600 animate-pulse">
                  Internship
                </span>{" "}
                Challenge
              </h1>

              {/* Subtitle Line */}
              <p className="mt-2 text-lg font-medium text-gray-700 sm:text-2xl animate-fade-in-up">
                Dream • Rise • Innovate • Perform
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
                <p><span className="font-semibold text-red-600">Starts:</span> [Insert Date & Time]</p>
                <p><span className="font-semibold text-red-600">Ends:</span> [Insert Date & Time]</p>
                <p><span className="font-semibold text-red-600">Mode:</span> Online</p>
              </div>

              {/* Eligibility */}
              <p
                className="mt-6 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full inline-block animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                Open to students of Grades 11th & 12th Standard
              </p>

              {/* CTA */}
              <a
                href="#"
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

          <div className="relative animate-fade-in-right">
            <div className="relative z-10">
              <img
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                alt="uGSOT DRIP Internship Challenge"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
