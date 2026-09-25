import { useEffect, useState } from "react";
import ShopPageLayout from "@/components/ShopPageLayout";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const CollectionsTracksuits = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch hoodies and joggers for the tracksuit collection
        const allProducts = await fetchProducts(50, 'tag:anti-love-hoodie OR tag:anti-love-jogger');
        
        // Sort: hoodies first (pink, grey, black, stone), then joggers (same order)
        const colorOrder = ['pink', 'grey', 'black', 'stone'];
        const sortedProducts = allProducts.sort((a, b) => {
          const aIsHoodie = a.node.tags?.includes('anti-love-hoodie') || a.node.title.toLowerCase().includes('hoodie');
          const bIsHoodie = b.node.tags?.includes('anti-love-hoodie') || b.node.title.toLowerCase().includes('hoodie');
          
          // Hoodies first
          if (aIsHoodie && !bIsHoodie) return -1;
          if (!aIsHoodie && bIsHoodie) return 1;
          
          // Within same type, sort by color order
          const aColor = a.node.title.toLowerCase().split(' ').pop() || '';
          const bColor = b.node.title.toLowerCase().split(' ').pop() || '';
          return colorOrder.indexOf(aColor) - colorOrder.indexOf(bColor);
        });
        
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error loading tracksuit products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ShopPageLayout
      title="TRACKSUITS"
      description="Head-to-toe cohesion — premium Anti-Love tracksuits with minimal branding and perfect drape."
    >
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
          Tracksuits drop soon. Stay tuned.
        </div>
      )}
    </ShopPageLayout>
  );
};

export default CollectionsTracksuits;
