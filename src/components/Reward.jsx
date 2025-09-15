"use client";

import React from "react";
import { FaBullseye, FaMedal, FaStar } from "react-icons/fa";


const RewardCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center">
    <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
      {icon} {/* Icon is rendered here */}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);


const PrizeItem = ({ image, title, subtitle, alt }) => (
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden rounded-xl bg-gray-50 aspect-square mb-4">
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          // Fallback to a colored div with icon if image fails
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 text-white text-4xl hidden items-center justify-center">
        {getIconForTitle(title)}
      </div>
      <div className="absolute inset-0 bg-red-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
    </div>
    <div className="text-center">
      <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{title}</h4>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  </div>
);

// Helper function to get icons for fallback
const getIconForTitle = (title) => {
  const iconMap = {
    "Tech Gadgets": "📱",
    "Official Merchandise": "👕",
    "Smart Accessories": "🎧",
    "Gift Vouchers": "🎁"
  };
  return iconMap[title] || "🏆";
};

const Reward = () => {
 const rewardTypes = [
  {
    icon: <FaBullseye className="text-red-600 w-8 h-8" />,
    title: "Learning Rewards",
    description:
      "After every session, you'll participate in an activity or quiz. Top performers win exciting prizes like gadgets, vouchers, and official uGSOT merchandise.",
  },
  {
    icon: <FaMedal className="text-red-600 w-8 h-8" />,
    title: "Consistency Rewards",
    description:
      "Students who attend all sessions and actively contribute will be recognized as uGSOT Star Learners and get exclusive certificates.",
  },
  {
    icon: <FaStar className="text-red-600 w-8 h-8" />,
    title: "Creator's Reward",
    description:
      "Love making content? Create a reel, vlog, or short video about your uGSOT journey. The best videos with strong reach and creativity will win the uGSOT Creator's Award, with special prizes and a feature on our official channels.",
  },
];

 

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold text-red-600 mb-4">
            Here's how rewards work at uGSOT:
          </h2>
        </header>

        {/* Reward Types Section */}
        <div className="mb-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
             Rewards and Recognition
            </h3>
            <p className="text-xl font-bold text-red-600 leading-relaxed">
           During the Internship
          </p>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
            Perform well, and you unlock exciting rewards along the way:
          </p>
          </div>
          
           <div class="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
          <div class="relative group">
            <div class="overflow-hidden aspect-w-1 aspect-h-1">
              <img
                class="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-1.png"
                alt=""
              />
            </div>
            <div class="flex items-start justify-between mt-4 space-x-4">
              <div class="w-full text-center">
                <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                  Tech gadgets to fuel your curiosity
                </h3>
              </div>
            </div>
          </div>

          <div class="relative group">
            <div class="overflow-hidden aspect-w-1 aspect-h-1">
              <img
                class="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-2.png"
                alt=""
              />
            </div>
            <div class="flex items-start justify-between mt-4 space-x-4">
              <div class="w-full text-center">
                <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                  Official uGSOT merchandise designed for young innovators
                  <span class="absolute inset-0" aria-hidden="true"></span>
                </h3>
              </div>
            </div>
          </div>

          <div class="relative group">
            <div class="overflow-hidden aspect-w-1 aspect-h-1">
              <img
                class="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-3.png"
                alt=""
              />
            </div>

            <div class="flex items-start justify-between mt-4 space-x-4">
              <div class="w-full text-center">
                <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                  Smart accessories like fitness bands and headphones
                </h3>
              </div>
            </div>
          </div>

          <div class="relative group">
            <div class="overflow-hidden aspect-w-1 aspect-h-1">
              <img
                class="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-4.png"
                alt=""
              />
            </div>
            <div class="flex items-start justify-between mt-4 space-x-4">
              <div class="w-full text-center">
                <h3 class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                 Gift vouchers from leading brands
                </h3>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Reward;