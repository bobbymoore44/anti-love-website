import { useEffect, useState } from "react";
import ShopPageLayout from "@/components/ShopPageLayout";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const ShopCaps = () => {
  const [caps, setCaps] = useState<ShopifyProduct[]>([]);
  const [beanies, setBeanies] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch caps and beanies
        const allProducts = await fetchProducts(50, 'tag:anti-love-cap OR tag:anti-love-beanie');
        
        // Separate caps and beanies
        const capProducts = allProducts.filter(p => p.node.tags?.includes('anti-love-cap'));
        const beanieProducts = allProducts.filter(p => p.node.tags?.includes('anti-love-beanie'));
        
        // Sort caps by color order: pink, royal-blue, black, white
        const capColorOrder = ['pink', 'royal', 'blue', 'black', 'white'];
        const sortedCaps = capProducts.sort((a, b) => {
          const aColor = a.node.title.toLowerCase().split(' ').pop() || '';
          const bColor = b.node.title.toLowerCase().split(' ').pop() || '';
          return capColorOrder.indexOf(aColor) - capColorOrder.indexOf(bColor);
        });
        
        // Sort beanies by color order: black, navy, pink
        const beanieColorOrder = ['black', 'navy', 'pink'];
        const sortedBeanies = beanieProducts.sort((a, b) => {
          const aColor = a.node.title.toLowerCase().split(' ').pop() || '';
          const bColor = b.node.title.toLowerCase().split(' ').pop() || '';
          return beanieColorOrder.indexOf(aColor) - beanieColorOrder.indexOf(bColor);
        });
        
        setCaps(sortedCaps);
        setBeanies(sortedBeanies);
      } catch (error) {
        console.error('Error loading caps and beanies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ShopPageLayout
      title="Caps & Beanies"
      description="Signature Anti-Love headwear — timeless streetwear essentials with bold, minimal embroidery."
    >
      {isLoading ? (
        <div className="text-center text-white/60 py-24">
          Loading products...
        </div>
      ) : (
        <>
          {/* Caps Section */}
          <section className="mb-16">
            <h2 className="al-section-title mb-4">CAPS</h2>
            <div className="al-title-rule mb-8" />
            {caps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {caps.map((product, index) => (
                  <ShopifyProductCard
                    key={product.node.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                No caps available right now.
              </div>
            )}
          </section>

          {/* Beanies Section */}
          <section>
            <h2 className="al-section-title mb-4">BEANIES</h2>
            <p className="text-muted-foreground mb-4 max-w-2xl">
              Signature Anti-Love beanies — soft-touch warmth with bold embroidery for colder days.
            </p>
            <div className="al-title-rule mb-8" />
            {beanies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {beanies.map((product, index) => (
                  <ShopifyProductCard
                    key={product.node.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                No beanies available right now.
              </div>
            )}
          </section>
        </>
      )}
    </ShopPageLayout>
  );
};

export default ShopCaps;
