import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/HeroCarousel";
import FeaturedSection from "@/components/FeaturedSection";
import HoodiesSection from "@/components/HoodiesSection";
import CapsCollectionHero from "@/components/CapsCollectionHero";
import CapsSection from "@/components/CapsSection";
import FracturedLoveHero from "@/components/FracturedLoveHero";
import TShirtsSection from "@/components/TShirtsSection";
import OuterwearCollectionHero from "@/components/OuterwearCollectionHero";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroCarousel />
      <FeaturedSection />
      <HoodiesSection />
      <CapsCollectionHero />
      <CapsSection />
      <FracturedLoveHero />
      <TShirtsSection />
      <OuterwearCollectionHero />
      <Footer />
    </div>
  );
};

export default Index;
