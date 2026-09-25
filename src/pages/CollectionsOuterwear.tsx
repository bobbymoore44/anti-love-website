import { useEffect, useState } from "react";
import ShopPageLayout from "@/components/ShopPageLayout";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const CollectionsOuterwear = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch puffer jackets and bomber jackets for the outerwear collection
        const allProducts = await fetchProducts(50, 'tag:creative-collection AND (tag:puffer OR tag:bomber)');
        
        // Sort: puffers first (black, navy, red), then bombers (black, navy, stone)
        const sortedProducts = allProducts.sort((a, b) => {
          const aIsPuffer = a.node.tags?.includes('puffer') || a.node.title.toLowerCase().includes('puffer');
          const bIsPuffer = b.node.tags?.includes('puffer') || b.node.title.toLowerCase().includes('puffer');
          
          // Puffers first
          if (aIsPuffer && !bIsPuffer) return -1;
          if (!aIsPuffer && bIsPuffer) return 1;
          
          // Within same type, sort by color order
          const pufferColorOrder = ['black', 'navy', 'red'];
          const bomberColorOrder = ['black', 'navy', 'stone'];
          const aColor = a.node.title.toLowerCase().split(' ').pop() || '';
          const bColor = b.node.title.toLowerCase().split(' ').pop() || '';
          
          if (aIsPuffer) {
            return pufferColorOrder.indexOf(aColor) - pufferColorOrder.indexOf(bColor);
          } else {
            return bomberColorOrder.indexOf(aColor) - bomberColorOrder.indexOf(bColor);
          }
        });
        
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error loading outerwear products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ShopPageLayout
      title="Outerwear"
      description="Engineered for cold streets and late nights — designed to move with intent."
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
          <div className="text-xl font-semibold mb-2">Coming Soon</div>
          <p className="text-sm">New outerwear pieces dropping soon.</p>
        </div>
      )}
    </ShopPageLayout>
  );
};

export default CollectionsOuterwear;
