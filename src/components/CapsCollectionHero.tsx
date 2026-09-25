import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CapsCollectionHero = () => {
  return (
    <section className="relative h-[80vh] md:h-[85vh] w-full overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source src="/videos/al-caps-visual.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content - Bottom Center */}
      <div className="relative z-10 h-full flex items-end justify-center text-center px-6 pb-16 md:pb-20">
        <div className="animate-fade-in max-w-3xl space-y-4">
          <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-none">
            ANTI-LOVE CAPS
          </h1>
          <p className="text-white/90 text-base md:text-lg font-medium tracking-wide max-w-2xl mx-auto">
            Timeless streetwear essentials with bold minimal embroidery.
          </p>
          <div className="pt-2">
            <Link to="/shop/caps">
              <Button
                size="lg"
                className="bg-white/8 backdrop-blur-[12px] border border-white/20 text-white hover:bg-white/14 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300 font-sans tracking-wider uppercase px-10 font-semibold rounded-xl"
              >
                SHOP CAPS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapsCollectionHero;
