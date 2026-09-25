import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import Footer from "@/components/Footer";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import fracturedHeroImage from "@/assets/fractured-hero-antilove.webp";

const CollectionsFracturedLove = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch products tagged with 'fractured-love'
        const allProducts = await fetchProducts(50, 'tag:fractured-love');
        setProducts(allProducts);
      } catch (error) {
        console.error('Error loading Fractured Love products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative w-full h-[45vh] md:h-[55vh] lg:h-[70vh] overflow-hidden">
        <img
          src={fracturedHeroImage}
          alt="Model wearing Anti-Love T-shirt with drift cars and neon lights in the background"
          className="w-full h-full object-cover object-[center_top]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
      </section>

      {/* Intro Block */}
      <section 
        id="fractured-love" 
        className="max-w-[1280px] mx-auto px-6 mt-16 mb-8"
      >
        <h1 
          className="font-black uppercase text-white tracking-tight leading-none mb-3"
          style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
        >
          FRACTURED LOVE
        </h1>
        <p 
          className="text-white/70 font-normal"
          style={{ fontSize: 'clamp(14px, 1.8vw, 18px)' }}
        >
          One-time runs, numbered pieces, and experimental palettes — when it's gone, it's gone.
        </p>
      </section>

      {/* Product Grid */}
      <section className="max-w-[1280px] mx-auto px-6 pb-24">
        {isLoading ? (
          <div className="text-center text-white/60 py-24">
            Loading products...
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <ShopifyProductCard
                key={product.node.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-white/60 py-24">
            No limited pieces available right now.
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default CollectionsFracturedLove;
