"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Session = () => {
  const sessions = [
    { id: 1, title: "Meet AI Like a Friend", icon: "/assets/b1.png" },
    { id: 2, title: "Build your personal AI Agents", icon: "/assets/b7.png" },
    { id: 3, title: "AI for content creation", icon: "/assets/b3.png" },
    {
      id: 4,
      title: "Social Media Smarts: The Psychology of going viral",
      icon: "/assets/b4.png",
    },
    {
      id: 5,
      title: "Build Your Own Game/Website (No Code)",
      icon: "/assets/b6.png",
    },
    {
      id: 6,
      title: "Metaverse 101: AI in Movies & Anime",
      icon: "/assets/b8.png",
    },
    {
      id: 7,
      title: "How to Build Your Personal Brand Online",
      icon: "/assets/b10.png",
    },
    { id: 8, title: "Design Your App: UI/UX Basics", icon: "/assets/b2.png" },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold leading-tight text-red-600 sm:text-4xl xl:text-5xl font-pj">
            Topics for the Internship
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8 font-pj">
            Each topic will teach essential AI and digital skills to help you
            thrive in the modern world. Master these cutting-edge technologies
            and unlock your potential.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid mt-10 text-center sm:mt-16 gap-0">
          {/* Mobile: 1 column */}
          <div className="grid grid-cols-1 gap-0 sm:hidden">
            {sessions.map((session, index) => (
              <div
                key={session.id}
                className={`p-4 ${index < 7 ? "border-b border-red-400" : ""}`}
              >
                <motion.div
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Image
                    src={session.icon}
                    alt={session.title}
                    width={48}
                    height={48}
                    className="object-contain w-12 h-12 m-auto mb-3"
                  />
                  <h3 className="text-xs font-semibold text-gray-900 font-pj leading-tight px-2">
                    {session.title}
                  </h3>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Tablet: 2 columns */}
          <div className="hidden sm:grid md:hidden grid-cols-2 gap-0">
            {sessions.map((session, index) => (
              <div
                key={session.id}
                className={`p-5 ${
                  index % 2 === 0 ? "border-r border-red-400" : ""
                } ${
                  index < 6 && (index + 1) % 2 === 0
                    ? "border-b border-red-400"
                    : ""
                } ${
                  index < 6 && index % 2 === 0 ? "border-b border-red-400" : ""
                }`}
              >
                <motion.div
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Image
                    src={session.icon}
                    alt={session.title}
                    width={56}
                    height={56}
                    className="object-contain w-14 h-14 m-auto mb-3"
                  />
                  <h3 className="text-sm font-semibold text-gray-900 font-pj leading-tight px-2">
                    {session.title}
                  </h3>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Medium: 4x2 */}
          <div className="hidden md:grid lg:hidden">
            <div className="grid grid-cols-4 gap-0">
              {sessions.map((session, index) => (
                <div
                  key={session.id}
                  className={`p-6 ${
                    (index + 1) % 4 !== 0 ? "border-r border-red-400" : ""
                  } ${index < 4 ? "border-b border-red-400" : ""}`}
                >
                  <motion.div
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Image
                      src={session.icon}
                      alt={session.title}
                      width={60}
                      height={60}
                      className="object-contain w-15 h-15 m-auto mb-4"
                    />
                    <h3 className="text-sm font-semibold text-gray-900 font-pj leading-tight px-1">
                      {session.title}
                    </h3>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Large: 4x2 */}
          <div className="hidden lg:grid grid-cols-4 gap-0">
            {sessions.map((session, index) => (
              <div
                key={session.id}
                className={`p-8 ${
                  (index + 1) % 4 !== 0 ? "border-r border-red-400" : ""
                } ${index < 4 ? "border-b border-red-400" : ""}`}
              >
                <motion.div
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Image
                    src={session.icon}
                    alt={session.title}
                    width={64}
                    height={64}
                    className="object-contain w-24 h-24 m-auto mb-4"
                  />
                  <h3 className="text-md font-semibold text-gray-900 font-pj leading-tight">
                    {session.title}
                  </h3>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Session;
