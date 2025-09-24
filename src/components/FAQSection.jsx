"use client";

import React from "react";
import { motion } from "framer-motion";

const FAQS = [
  {
    q: "Who can apply for the IGNITE Internship Challenge?",
    a: "The IGNITE Internship Challenge is open to all students currently studying in Grade 11 and Grade 12 from any school or board across India. No prior technical knowledge is required, just curiosity and the drive to learn.",
  },
  {
    q: "Is there any fee to participate in the internship challenge?",
    a: "No, participation in the IGNITE Internship Challenge is completely free. All sessions, workshops, and activities are designed to give you hands-on learning without any cost.",
  },
  {
    q: "Do I need prior knowledge of AI or coding to join?",
    a: "Not at all. The internship is designed for school students and covers everything from basic AI concepts to fun applications. Whether you’re a beginner or a tech enthusiast, you’ll find value in every session.",
  },
  {
    q: "What rewards or certifications will I receive?",
    a: "Participants will receive a Certificate of Completion from upGrad School of Technology. Top performers can also earn Letters of Recommendation, exclusive uGSOT merchandise, tech gadgets, and special badges like the Certificate of Active Engagement for consistent participation.",
  },
  {
    q: "How will the sessions be conducted?",
    a: "The internship will be held online with a mix of live sessions, interactive workshops, and hands-on activities. Some capstone elements may include optional hybrid events for added real-world exposure.",
  },
  {
    q: "What is the time commitment for participants?",
    a: "Sessions are planned to be short and impactful, typically a few hours each day over the 10-day program. You can easily manage them alongside school schedules.",
  },
  {
    q: "How does IGNITE connect to the B.Tech program at uGSOT?",
    a: "IGNITE gives you a sneak peek into uGSOT’s cutting-edge 4-year residential B.Tech program, where students learn from industry professionals in fields like GenAI, Robotics, and Quantum Computing, while exploring research, startups, and global internships.",
  },
  {
    q: "Where will I receive details about the workshop schedule after registration?",
    a: "Once you register, all updates and the detailed workshop schedule will be sent directly to your registered email ID. Keep an eye on your inbox (and spam folder, just in case) to stay informed.",
  },
];

// Outer container → stagger between FAQs
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8,
    },
  },
};

// Inner container for Q → A
const qaContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Single item animation
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function FAQSection({ faqs = FAQS }) {
  return (
    <section className="py-12 px-4 mb-4">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-black">
          Frequently Asked <span className="text-red-600">Questions</span>
        </h2>
        <p className="text-center text-gray-600 mt-3 mb-8">
          Curiosity Leads to Success! Got questions? That's a great sign. Some common queries:
        </p>

        {/* FAQ Container */}
        <div className="border border-gray-300 rounded-2xl p-6 md:p-8 bg-white">
          <motion.div
            className="space-y-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {faqs.map((f, idx) => (
              <motion.div
                key={idx}
                className="relative space-y-4"
                variants={qaContainer}
              >
                {/* Question bubble */}
                <motion.div className="flex justify-end" variants={item}>
                  <div className="max-w-[85%] md:max-w-[70%] px-5 py-3 text-sm font-medium text-white bg-red-600 inline-block shadow-lg rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl">
                    <div className="whitespace-pre-wrap">{f.q}</div>
                  </div>
                </motion.div>

                {/* Answer bubble */}
                <motion.div className="flex justify-start" variants={item}>
                  <div className="max-w-[85%] md:max-w-[70%] px-5 py-3 text-sm text-gray-800 bg-gray-100 inline-block shadow-inner rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                    <div className="whitespace-pre-wrap">{f.a}</div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
