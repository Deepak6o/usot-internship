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
            {/* Content backdrop for better readability */}
            <div className="absolute inset-0 transform bg-white bg-opacity-40 blur-3xl rounded-3xl -rotate-1"></div>

            <div className="relative z-10 p-8">
              <p className="text-base font-semibold tracking-wider text-red-600 uppercase animate-fade-in">
                upGrad School of Technology
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-black lg:mt-8 sm:text-6xl xl:text-8xl animate-fade-in-up">
                Young Innovator{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 animate-pulse">
                  Internship
                </span>{" "}
                Challenge
              </h1>
              <p
                className="mt-4 text-base text-black lg:mt-8 sm:text-xl animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                A unique{" "}
                <span className="font-semibold text-red-600">internship</span>{" "}
                challenge designed by the best in tech.
              </p>

              <a
                href="#"
                title=""
                className="inline-flex items-center px-8 py-4 mt-8 font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-red-500 to-orange-500 lg:mt-16 hover:from-red-600 hover:to-orange-600 focus:from-red-600 focus:to-orange-600 hover:scale-105 hover:shadow-xl animate-fade-in-up"
                role="button"
                style={{ animationDelay: "0.4s" }}
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

              <p
                className="mt-5 text-gray-600 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                Already joined us?{" "}
                <a
                  href="#"
                  title=""
                  className="font-medium text-black transition-all duration-200 hover:underline"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>

          <div className="relative animate-fade-in-right">
            <div className="relative z-10">
              <img
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                alt="Young Innovator Challenge"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
