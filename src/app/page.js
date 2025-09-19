import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RegistrationForm from "@/components/RegistrationForm";
import Introduction from "@/components/Introduction";
import Reward from "@/components/Reward";
import Session from "@/components/Session";
import Footer from "@/components/Footer";
import AfterInternship from "@/components/AfterInternship";
import WhyAttend from "@/components/WhyAttend";

export default function Home() {
  return (
    <>
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="introduction">
        <Introduction />
      </div>
      <div id="reward">
        <Reward />
      </div>
      <div id="why-attend">
        <WhyAttend />
      </div>
      <div id="after-internship">
        <AfterInternship />
      </div>
      <div id="session">
        <Session />
      </div>
      <Footer />
    </>
  );
}