import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/al-hero-section-image.webp";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Anti-Love Campaign"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      {/* Content - Bottom Left */}
      <div className="relative z-10 h-full flex items-end px-6 md:px-12 pb-12 md:pb-16">
        <div className="animate-fade-in max-w-3xl">
          <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tighter uppercase leading-[0.9] [text-shadow:_0_2px_20px_rgb(0_0_0_/_40%)] [font-weight:_900] [-webkit-text-stroke:_1px_white]">
            NEW ARRIVALS
          </h1>
          <Button
            size="lg"
            className="group bg-transparent border-2 border-white text-white hover:bg-primary hover:border-primary transition-all duration-300 font-sans tracking-widest uppercase px-8"
          >
            SHOP NOW
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
