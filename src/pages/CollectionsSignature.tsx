import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import Footer from "@/components/Footer";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import antiLoveCrest from "@/assets/anti-love-icon-3.webp";

const CollectionsSignature = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch products tagged with 'signature'
        const allProducts = await fetchProducts(50, 'tag:signature');
        // Filter to only show Signature Tees and Signature Hoodies
        const filteredProducts = allProducts.filter(product => {
          const title = product.node.title.toLowerCase();
          return title.includes('signature tee') || title.includes('signature hoodie');
        });
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error loading Signature products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('signature-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative w-full h-[45vh] md:h-[55vh] lg:h-[70vh] overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,170,180,0.12)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Hero Content */}
        <div className="relative h-full max-w-[1280px] mx-auto px-6">
          <div className="h-full grid lg:grid-cols-[1fr_minmax(420px,640px)] gap-8 lg:gap-16 items-center">
            {/* Text Column */}
            <div className="z-10">
              <p className="text-primary/80 uppercase tracking-[0.3em] text-xs md:text-sm font-medium mb-3 md:mb-4">
                SIGNATURE
              </p>
              <h1 
                className="font-black uppercase text-white tracking-tight leading-none mb-4 md:mb-6"
                style={{ fontSize: 'clamp(48px, 7vw, 84px)' }}
              >
                ANTI-LOVE<br />SIGNATURE
              </h1>
              <p 
                className="text-white/80 font-normal mb-6 md:mb-8 max-w-xl"
                style={{ fontSize: 'clamp(15px, 2vw, 19px)' }}
              >
                Elevated essentials in premium weights — built for presence.
              </p>
              <button 
                onClick={scrollToProducts}
                className="inline-flex items-center gap-2 bg-primary text-black font-semibold px-8 py-3.5 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Shop Signature
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                </svg>
              </button>
            </div>

            {/* Logo Column */}
            <div 
              className="hidden lg:flex justify-end items-center" 
              aria-hidden="true" 
              role="presentation"
            >
              <div
                className="relative w-full max-w-[640px] aspect-square animate-fade-in before:content-[''] before:block before:w-full before:h-full before:bg-primary before:opacity-100 before:mix-blend-screen"
                style={{
                  WebkitMask: `url(${antiLoveCrest}) no-repeat center / contain`,
                  mask: `url(${antiLoveCrest}) no-repeat center / contain`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="signature-products" className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {isLoading ? 'Loading...' : `${products.length} ${products.length === 1 ? 'Item' : 'Items'}`}
          </h2>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="text-center text-white/60 py-24">
            Loading products...
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
            No signature pieces available right now.
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default CollectionsSignature;
