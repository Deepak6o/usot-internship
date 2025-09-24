"use client";

import React from "react";

const RewardCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center">
    <div className="flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4">
      {icon} {/* Icon or Image */}
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
);

const Reward = () => {
 const rewardTypes = [
  {
    icon: (
      <img
        src="/assets/rw1.png"
        alt="Learning Rewards"
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
      />
    ),
    title: "Excellency Rewards",
    description: (
      <>
        After every session, you’ll take part in an activity or quiz. Top
        performers from each round will be recognized as{" "}
        <span className="font-bold">uGSOT Star Learners</span> and win exciting
        prizes like smart watches, Xbox top brands vouchers, and official
        merchandise.
      </>
    ),
  },
  {
    icon: (
      <img
        src="/assets/rw2.png"
        alt="Consistency Rewards"
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
      />
    ),
    title: "Consistency Rewards",
    description: (
      <>
        Showing up matters. Students who attend all sessions and actively
        participate will earn the{" "}
        <span className="font-bold">Certificate of Active Engagement</span>, a
        special recognition of consistency, discipline, and commitment that will
        stand out on any profile.
      </>
    ),
  },
  {
    icon: (
      <img
        src="/assets/rw3.png"
        alt="Creator's Reward"
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
      />
    ),
    title: "Creator's Reward",
    description: (
      <>
        Love making content? Here’s your chance! Create a reel, vlog, or short
        video about your uGSOT internship journey. If your video gains strong
        reach and creativity points, top 3 winners can claim the{" "}
        <span className="font-bold">uGSOT Creator’s Award</span> with exclusive
        prizes like smart watches, headphones, top brands vouchers and a feature
        on our official channel.
      </>
    ),
  },
];


  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header Section */}
        <header className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-red-600 mb-4">
            Here’s How Rewards Work at IGNITE Challenge
          </h2>
        </header>

        {/* Reward Types Section */}
        <div className="mb-16">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rewardTypes.map((reward, index) => (
              <RewardCard
                key={index}
                icon={reward.icon}
                title={reward.title}
                description={reward.description}
              />
            ))}
          </div>
        </div>

        {/* Prizes Showcase Section */}
        <div>
          <div className="text-center mb-10 sm:mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">
              Rewards and Recognition
            </h3>
            <p className="text-lg sm:text-xl font-bold text-black leading-relaxed">
              During the Internship
            </p>
            <p className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed">
              Perform well, and you bag exciting rewards along the way
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-10 lg:mt-16 lg:grid-cols-4">
            {[
              {
                img: "/assets/r1.jpg",
                text: "Tech gadgets to fuel your curiosity",
              },
              {
                img: "/assets/r2.jpg",
                text: "Official uGSOT merchandise designed for young innovators",
              },
              {
                img: "/assets/r3.jpg",
                text: "Smart accessories like fitness bands and headphones",
              },
              {
                img: "/assets/r4.jpg",
                text: "Gift vouchers from leading brands",
              },
            ].map((prize, idx) => (
              <div key={idx} className="relative group">
                <div className="overflow-hidden aspect-square rounded-xl">
                  <img
                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                    src={prize.img}
                    alt={`Prize ${idx + 1}`}
                  />
                </div>
                <div className="mt-3 sm:mt-4 text-center">
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900">
                    {prize.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reward;
