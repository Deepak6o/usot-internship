"use client";

import React from "react";

export default function ChallengeSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <section
        className="relative flex flex-col items-center justify-center mx-auto max-w-[1600px] w-full text-center 
        py-12 sm:py-16 md:py-20 lg:py-28 
        bg-[url('/assets/banner1.jpg')] bg-cover bg-center bg-no-repeat"
      >
        {/* Black overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>

        {/* Content */}
        <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-16">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-white max-w-7xl mx-auto drop-shadow-lg leading-snug md:leading-tight">
            What is the{" "}
            <span className="text-red-600 font-extrabold">
              IGNITE Internship Challenge ?
            </span>
          </h1>

          {/* Divider */}
          <div className="h-[3px] sm:h-[4px] w-full max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-5xl my-4 sm:my-5 mx-auto bg-gradient-to-r from-transparent via-white to-transparent opacity-70"></div>

          <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-100 max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl font-medium md:font-semibold mx-auto drop-shadow-md leading-relaxed">
            A one-of-its-kind internship challenge crafted especially for{" "}
            <span className="text-red-600">Grade 12</span> students, helping you
            explore creativity, innovation, and real-world tech skills before
            you step into college life. From AI to social media, dive into
            hands-on sessions with industry experts, all at zero cost, powered
            by upGrad School of Technology. And if you're in{" "}
            <span className="text-red-600">Grade 11</span>? You're welcome too,
            get a head start while the world's still preparing.
          </p>
        </div>
      </section>
    </>
  );
}
