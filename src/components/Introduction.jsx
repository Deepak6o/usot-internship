"use client";

import Image from "next/image";
import React from "react";

const Introduction = () => {
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
        <img
          src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
          alt="Background Pattern"
          className="w-auto h-full"
        />
      </div>

      <section className="bg-[#ffffff] bg-opacity-30 relative py-12 sm:py-16 lg:pt-10 lg:pb-20">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-y-12 lg:items-center lg:grid-cols-2 lg:gap-x-16 sm:gap-y-20 xl:grid-cols-5">
            {/* Left Text */}
            <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
              <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-4xl lg:leading-tight font-pj">
                  Introducing the{" "}
                  <span className="text-red-600">
                    Young Innovator Internship Challenge
                  </span>
                </h1>

                <div className="mt-2 lg:mt-6 lg:flex lg:items-center">
                  <p className="mt-2 text-lg">
                    A one-of-a-kind internship challenge that rewards you for
                    learning and improving. Designed exclusively for 11th & 12th
                    standard students, this internship challenge features 6
                    engaging sessions led by industry experts. After each
                    session, you&apos;ll take a short quiz, and one winner from each
                    quiz will receive exciting gifts like an Xbox, smartwatches,
                    SST merchandise, and more.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="xl:col-span-3">
              <img
                src="https://d33wubrfki0l68.cloudfront.net/29c501c64b21014b3f2e225abe02fe31fd8f3a5c/f866d/images/hero/3/illustration.png"
                alt="Illustration"
                width={800}
                height={600}
                className="w-full mx-auto scale-110"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
