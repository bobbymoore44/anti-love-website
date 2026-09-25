import { useState, useEffect } from 'react';
import FeaturedProductCard from "./FeaturedProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const FeaturedSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Featured products: Blue Signature Tee, Pink Signature Hoodie, White Cap
  const featuredHandles = [
    'anti-love-signature-tee-blue',
    'anti-love-signature-hoodie-pink',
    'anti-love-cap-white',
  ];

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await fetchProducts(100);
        const featured = products.filter(p => 
          featuredHandles.includes(p.node.handle)
        );
        // Sort to match the desired order
        const sorted = featuredHandles
          .map(handle => featured.find(p => p.node.handle === handle))
          .filter(Boolean) as ShopifyProduct[];
        setFeaturedProducts(sorted);
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFeaturedProducts();
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-background overflow-hidden">
      {/* Premium radial gradient backdrop - deep charcoal to dark plum with blush center */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 60%, hsl(351 40% 8%), hsl(0 0% 3%) 60%, hsl(0 0% 0%))",
        }}
      />
      
      {/* Subtle animated glow behind cards */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle 600px at 50% 55%, rgba(243,182,193,0.12), transparent 70%)",
          animation: "pulse 12s ease-in-out infinite"
        }}
      />
      
      <div className="relative max-w-[1300px] mx-auto">
        {/* Section Title & Subtitle - Editorial Style */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in">
          <h2 
            className="font-sans text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-4"
            style={{
              textShadow: "0 0 60px rgba(243,182,193,0.5), 0 0 30px rgba(243,182,193,0.3)"
            }}
          >
            FEATURED
          </h2>
          <p className="text-sm md:text-base font-medium text-muted-foreground/90 max-w-[520px] mx-auto mb-6 leading-relaxed">
            Handpicked Anti-Love staples — crafted for everyday movement.
          </p>
          {/* Collection mark - thin pink accent line with center dot */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-primary/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(243,182,193,0.6)]" />
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-primary/60" />
          </div>
        </div>

        {/* Product Grid - 3 large cards centered with staggered entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12 xl:gap-14 justify-items-center">
          {isLoading ? (
            <p className="col-span-full text-center text-white/50">Loading featured products...</p>
          ) : (
            featuredProducts.map((product, index) => (
              <FeaturedProductCard
                key={product.node.handle}
                product={product}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
