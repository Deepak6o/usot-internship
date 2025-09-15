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
        bg-[url('/assets/banner.png')] bg-cover bg-center bg-no-repeat"
      >
        {/* Black overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>

        {/* Content */}
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-4xl mx-auto drop-shadow-lg leading-tight">
            What is the <span className="text-red-600">Challenge</span>?
          </h1>
          <div className="h-[4px] w-40 my-5 mx-auto bg-gradient-to-l from-transparent to-white"></div>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
            At{" "}
            <span className="font-semibold">
              <span className="text-red-600">uGSOT</span>
            </span>
            , we believe true engineering education begins by doing.  
            A first-of-its-kind internship challenge that celebrates your
            learning, creativity, and innovation. Designed for{" "}
            <span className="font-semibold text-white">11th & 12th grade students</span>, 
            the challenge includes engaging sessions led by industry experts,
            where you’ll explore{" "}
            <span className="font-semibold text-white">AI, Robotics, and more</span>.
          </p>
          <button className="px-10 py-4 mt-8 text-lg font-semibold bg-white text-red-700 rounded-full shadow-lg hover:scale-110 transition duration-300">
            Join the Challenge
          </button>
        </div>
      </section>
    </>
  );
}
