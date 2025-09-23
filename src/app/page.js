import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RegistrationForm from "@/components/RegistrationForm";
import Introduction from "@/components/Introduction";
import Reward from "@/components/Reward";
import Session from "@/components/Session";
import Footer from "@/components/Footer";
import AfterInternship from "@/components/AfterInternship";
import WhyAttend from "@/components/WhyAttend";
import AdmissionProcess from "@/components/AdmissionProcess";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Introduction />
      <AdmissionProcess />
      <Reward />
      <AfterInternship />
      <Session />
      <WhyAttend />
      <Footer />
    </>
  );
}
