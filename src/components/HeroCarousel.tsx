import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/al-hero-section-image.webp";
import fracturedImage from "@/assets/fractured-love-hero.jpg";
import outerwearImage from "@/assets/AL-outerwear-visual.webp";

const slides = [
  {
    id: 1,
    type: "image" as const,
    bg: heroImage,
    headline: "NEW ARRIVALS",
    sub: "Fresh Anti-Love pieces - ready for pre order.",
    cta: "Shop Now",
    link: "/collections/new-arrivals",
  },
  {
    id: 2,
    type: "video" as const,
    bg: "/videos/al-video-fractured-love.webm",
    poster: fracturedImage,
    tag: "LIVE NOW — DROP 001",
    headline: "FRACTURED LOVE",
    sub: "One-time run. Numbered. When it's gone, it's gone.",
    cta: "Explore Drop",
    link: "/collections/fractured-love",
  },
  {
    id: 3,
    type: "image" as const,
    bg: outerwearImage,
    headline: "OUTERWEAR",
    sub: "Engineered for cold streets and late nights.",
    cta: "Shop Outerwear",
    link: "/collections/outerwear",
  },
];

const HeroCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const autoplay = Autoplay({ 
    delay: 3000, 
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      duration: 30,
    },
    [autoplay]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Pause autoplay when tab is hidden
  useEffect(() => {
    if (!emblaApi) return;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        autoplay.stop();
      } else {
        autoplay.play();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [autoplay, emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollPrev, scrollNext]);

  // Check for reduced motion preference
  useEffect(() => {
    if (!emblaApi) return;
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      autoplay.stop();
    }
  }, [autoplay, emblaApi]);

  return (
    <section
      className="relative h-screen min-h-[80vh] w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex-[0_0_100%] min-w-0 relative h-full"
              aria-hidden={selectedIndex !== index}
            >
              {/* Background Media */}
              <div className="absolute inset-0">
                {slide.type === "video" ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={slide.poster}
                    className="w-full h-full object-cover brightness-110 contrast-105"
                    preload={index === 0 ? "auto" : "none"}
                  >
                    <source src={slide.bg} type="video/webm" />
                  </video>
                ) : (
                  <img
                    src={slide.bg}
                    alt=""
                    className={`w-full h-full object-cover ${
                      index === 0 ? "brightness-[1.15] contrast-105" : ""
                    }`}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                )}
                {/* Gradient overlay - lighter for New Arrivals */}
                <div 
                  className={`absolute inset-0 ${
                    index === 0 
                      ? "bg-gradient-to-b from-black/15 via-black/30 to-black/45"
                      : "bg-gradient-to-b from-black/35 via-black/55 to-black/75"
                  }`}
                />
              </div>

              {/* Content - Bottom Left */}
              <div className="relative z-10 h-full flex items-end px-6 md:px-12 pb-12 md:pb-20">
                <div 
                  className="max-w-[800px] animate-fade-in"
                  style={{ animationDelay: "120ms" }}
                >
                  {slide.tag && (
                    <h5 
                      className="text-sm font-medium tracking-[2px] text-white/80 uppercase mb-2 inline-block border-b border-white/25 pb-1 animate-fade-in"
                      style={{ animationDelay: "300ms" }}
                    >
                      {slide.tag}
                    </h5>
                  )}
                  <h1 className="font-sans text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white mb-4 tracking-tight uppercase leading-[1.1] [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)] [font-weight:_700] [-webkit-text-stroke:_0.5px_white]">
                    {slide.headline}
                  </h1>
                  <p className="text-white/90 text-base md:text-lg font-medium tracking-wide mb-6 max-w-md">
                    {slide.sub}
                  </p>
                  <Link to={slide.link}>
                    <Button
                      size="lg"
                      className="group bg-white/10 backdrop-blur-[12px] border-2 border-white/30 text-white hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 font-sans tracking-widest uppercase px-8 font-semibold"
                    >
                      {slide.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full opacity-75 hover:opacity-100 hover:bg-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full opacity-75 hover:opacity-100 hover:bg-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={selectedIndex === index ? "true" : "false"}
            className={`w-2 h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
              selectedIndex === index
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
