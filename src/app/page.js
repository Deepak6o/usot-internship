import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RegistrationForm from "@/components/RegistrationForm";
import Introduction from "@/components/Introduction";
import Reward from "@/components/Reward";
import Session from "@/components/Session";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Introduction />
      <RegistrationForm />
      <Reward />
      <Session />
      {/* <Footer /> */}
    </>
  );
}
