import React from "react";

const Reward = () => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600 sm:text-4xl">
            Rewards and Recognition
          </h2>
          <h3 className="text-xl font-bold text-black-600 sm:text-xl mt-4">
            During the Internship and Recognition
          </h3>
          <p className="mt-4 text-base font-normal leading-7 text-gray-600">
            Each session ends with a quick quiz answer right and win exciting
            rewards instantly!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
          <div className="relative group">
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
              <img
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-1.png"
                alt=""
              />
            </div>
            <div className="flex items-start justify-between mt-4 space-x-4">
              <div className="w-full text-center">
                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                  Beoplay M5 Bluetooth Speaker
                </h3>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
              <img
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-2.png"
                alt=""
              />
            </div>
            <div className="flex items-start justify-between mt-4 space-x-4">
              <div className="w-full text-center">
                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                  Apple Smart Watch 6 - Special Edition
                  <span className="absolute inset-0" aria-hidden="true"></span>
                </h3>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
              <img
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-3.png"
                alt=""
              />
            </div>

            <div className="flex items-start justify-between mt-4 space-x-4">
              <div className="w-full text-center">
                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                  Beylob 90 Speaker
                </h3>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
              <img
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-4.png"
                alt=""
              />
            </div>
            <div className="flex items-start justify-between mt-4 space-x-4">
              <div className="w-full text-center">
                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                  Martino 75 Bluetooth
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reward;
