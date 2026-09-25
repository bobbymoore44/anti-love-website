import { Link } from "react-router-dom";
import whiteImage from "@/assets/tshirt-fractured-white-front.png";
import blackImage from "@/assets/tshirt-fractured-black-front.png";

const FracturedLoveHero = () => {
  const products = [
    {
      handle: 'fractured-love-t-shirt-white',
      title: 'Fractured Love T-Shirt',
      color: 'White',
      image: whiteImage,
      price: 65,
    },
    {
      handle: 'fractured-love-t-shirt-black',
      title: 'Fractured Love T-Shirt',
      color: 'Black',
      image: blackImage,
      price: 65,
    },
  ];

  return (
    <section 
      className="relative w-full overflow-hidden min-h-[55vh] md:min-h-[60vh] lg:min-h-[70vh] lg:max-h-[900px]"
      aria-label="Fractured Love — Drop 001 now live"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/al-video-fractured-love.webm"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      {/* Content - Centered layout */}
      <div className="relative z-10 h-full min-h-[55vh] md:min-h-[60vh] lg:min-h-[70vh] lg:max-h-[900px] flex flex-col items-center justify-center px-4 md:px-6 pb-12 md:pb-16 pt-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12 animate-fade-in">
          {/* Eyebrow */}
          <p className="text-xs md:text-sm font-sans uppercase tracking-[0.12em] text-primary mb-3 md:mb-4 font-semibold">
            NOW LIVE • DROP 001
          </p>
          
          {/* Title */}
          <h2 
            className="font-sans font-black text-white tracking-tighter uppercase leading-[0.9] [text-shadow:_0_2px_20px_rgb(0_0_0_/_60%)] [-webkit-text-stroke:_0.5px_white]"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}
          >
            FRACTURED LOVE DROP
          </h2>
        </div>

        {/* Product Cards */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start justify-items-center">
            {products.map((product, index) => (
              <Link
                key={product.handle}
                to={`/product/${product.handle}`}
                className="group/card w-full max-w-[420px] relative rounded-3xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${200 + index * 40}ms` }}
                aria-label={`Shop ${product.title} ${product.color}`}
              >
                {/* Inner dark glass gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 pointer-events-none" />
                
                {/* Image */}
                <div className="relative flex items-center justify-center p-8 aspect-[4/5]">
                  <img
                    src={product.image}
                    alt={`${product.title} ${product.color}`}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Bottom Info */}
                <div className="relative bg-black/50 backdrop-blur-md p-5 flex flex-col items-start text-left">
                  <h3 className="text-white font-semibold tracking-wide text-sm">{product.title}</h3>
                  <p className="text-white/70 text-xs mt-1">{product.color}</p>
                  
                  <div className="flex w-full items-center justify-between mt-3">
                    <span className="text-white font-semibold">£{product.price}</span>
                    <button className="relative inline-flex items-center gap-2 px-5 py-1.5 font-medium text-sm tracking-wide text-white 
                      bg-gradient-to-r from-primary via-primary to-primary bg-[length:200%_100%]
                      rounded-full shadow-[0_0_15px_hsl(var(--pink-glow)/0.4)]
                      transition-all duration-500 
                      hover:shadow-[0_0_25px_hsl(var(--pink-glow)/0.7)] hover:brightness-110 hover:-translate-y-[1px] hover:bg-[position:100%_0]
                      active:scale-[0.97]">
                      <span className="relative z-10">Shop Now</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5 relative z-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                      
                      {/* subtle inner glow overlay */}
                      <span className="absolute inset-0 rounded-full bg-white/10 blur-[3px] opacity-60 group-hover:opacity-90 transition-opacity duration-300"></span>
                      
                      {/* light reflection shimmer */}
                      <span className="absolute left-0 top-0 w-full h-full rounded-full bg-gradient-to-r from-white/10 via-white/30 to-transparent opacity-0 group-hover:opacity-70 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 ease-out"></span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FracturedLoveHero;
