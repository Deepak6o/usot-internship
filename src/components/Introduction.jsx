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
        className="relative flex flex-col items-center justify-center mx-auto max-w-8xl w-full text-center py-20 md:py-28 
        bg-[url('/assets/banner1.jpg')] bg-cover bg-center bg-no-repeat"
      >
        {/* Black overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>

        {/* Content */}
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-semibold text-white max-w-7xl mx-auto drop-shadow-lg leading-tight">
            What is the{" "}
            <span className="text-red-600 font-extrabold">
              DRIP Internship Challenge ?
            </span>
          </h1>
          <div className="h-[4px] w-full max-w-5xl my-5 mx-auto bg-gradient-to-r from-transparent via-white to-transparent opacity-70"></div>
          <p className="text-2xl md:text-2xl text-gray-100 max-w-6xl font-semibold mx-auto drop-shadow-md leading-relaxed">
            A one-of-its-kind internship challenge built to spark your
            creativity, innovation, and learning. Designed exclusively for <span className="text-red-600">Grade
            11 & 12</span> students it brings you hands-on sessions with industry
            experts where you'll dive into Al, social media, and beyond powered
            by upGrad School of Technology.
          </p>
          
        </div>
      </section>
    </>
  );
}
