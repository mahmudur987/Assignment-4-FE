import CallToAction from "@/components/module/Home/CallToAction";
import FeatureHighlights from "@/components/module/Home/FeatureHighlights";
import HeroSection from "@/components/module/Home/HeroSection";
import HomeBooks from "@/components/module/Home/HomeBook";

const Home = () => {
  return (
    <section>
      <HeroSection />
      <FeatureHighlights />
      <HomeBooks />
      <CallToAction />
    </section>
  );
};

export default Home;
