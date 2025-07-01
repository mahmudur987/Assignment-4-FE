import CallToAction from "@/components/module/Home/CallToAction";
import FeatureHighlights from "@/components/module/Home/FeatureHighlights";
import HeroSection from "@/components/module/Home/HeroSection";

const Home = () => {
  return (
    <section>
      <HeroSection />
      <FeatureHighlights />
      <CallToAction />
    </section>
  );
};

export default Home;
