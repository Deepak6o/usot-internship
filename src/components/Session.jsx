import React from "react";
import Image from "next/image";

const Session = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-red-600 sm:text-4xl xl:text-5xl font-pj">
            Six Exciting Sessions
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8 font-pj">
            Each challenge will teach an important entrepreneurial skill to the
            interns. Successfully clearing each challenge unlocks rewards for
            them.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
          {/* Card 1 */}
          <div className="md:p-8 lg:p-14">
            <Image
              src="/assets/id-card.png"
              alt="Personal Branding"
              width={48}
              height={48}
              className="object-contain w-12 h-12 m-auto"
            />
            <h3 className="mt-5 text-xl font-bold text-gray-900 font-pj">
              Personal Branding Building
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
            </p>
          </div>

          {/* Card 2 */}
          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
            <Image
              src="/assets/error.png"
              alt="AI Agent"
              width={48}
              height={48}
              className="object-contain w-12 h-12 m-auto"
            />
            <h3 className="mt-5 text-xl font-bold text-gray-900 font-pj">
              Building a No-Code AI Agent
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
            </p>
          </div>

          {/* Card 3 */}
          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
            <Image
              src="/assets/shuttle.png"
              alt="Fundraising"
              width={48}
              height={48}
              className="object-contain w-12 h-12 m-auto"
            />
            <h3 className="mt-5 text-xl font-bold text-gray-900 font-pj">
              Fundraising & Pitching for Startups
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
            </p>
          </div>

          {/* Card 4 */}
          <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200">
            <Image
              src="/assets/video.png"
              alt="Video Generation"
              width={48}
              height={48}
              className="object-contain w-12 h-12 m-auto"
            />
            <h3 className="mt-5 text-xl font-bold text-gray-900 font-pj">
              Video Generation & Content Creation through AI
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
            </p>
          </div>

          {/* Card 5 */}
          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
            <Image
              src="/assets/generative.png"
              alt="Website Development"
              width={48}
              height={48}
              className="object-contain w-12 h-12 m-auto"
            />
            <h3 className="mt-5 text-xl font-bold text-gray-900 font-pj">
              Website Development with AI
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
            </p>
          </div>

          {/* Card 6 */}
          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
            <Image
              src="/assets/extension.png"
              alt="UI/UX"
              width={48}
              height={48}
              className="object-contain w-12 h-12 m-auto"
            />
            <h3 className="mt-5 text-xl font-bold text-gray-900 font-pj">
              Introduction to UI/UX Website
            </h3>
            <p className="mt-5 text-base text-gray-600 font-pj">
              Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec,
              proin faucibus nibh et sagittis a. Lacinia purus ac amet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Session;
