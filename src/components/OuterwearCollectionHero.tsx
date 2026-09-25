import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import outerwearVisual from "@/assets/AL-outerwear-visual.webp";

const OuterwearCollectionHero = () => {
  return (
    <section 
      id="home-outerwear-visual"
      className="relative h-[70vh] md:h-[80vh] lg:h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={outerwearVisual}
          alt="Anti-Love Outerwear - His & Hers collection"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content - Bottom Center */}
      <div className="relative z-10 h-full flex items-end justify-center text-center px-6 pb-[8vh] md:pb-[10vh]">
        <div className="animate-fade-in max-w-[900px] space-y-4">
          <p className="text-primary text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-2">
            Now Available
          </p>
          <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-none [text-shadow:_0_2px_8px_rgba(0,0,0,0.5)]">
            ANTI-LOVE OUTERWEAR
          </h1>
          <p className="text-white/90 text-base md:text-lg font-medium tracking-wide max-w-2xl mx-auto">
            Engineered for cold streets and late nights. Designed to move with intent.
          </p>
          <div className="pt-2">
            <Link to="/collections/outerwear">
              <Button
                size="lg"
                className="bg-white/8 backdrop-blur-[12px] border border-white/20 text-white hover:bg-white/14 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300 font-sans tracking-wider uppercase px-10 font-semibold rounded-xl"
              >
                SHOP OUTERWEAR
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OuterwearCollectionHero;
