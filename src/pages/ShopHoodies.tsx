import { useEffect, useState } from "react";
import ShopPageLayout from "@/components/ShopPageLayout";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const ShopHoodies = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch all hoodie products (both signature and basic)
        const allProducts = await fetchProducts(50, 'tag:anti-love-hoodie OR tag:anti-love-signature-hoodie');
        
        // Sort: signature hoodies first, then basic hoodies
        const sortedProducts = allProducts.sort((a, b) => {
          const aIsSignature = a.node.tags?.includes('signature') || a.node.tags?.includes('anti-love-signature-hoodie');
          const bIsSignature = b.node.tags?.includes('signature') || b.node.tags?.includes('anti-love-signature-hoodie');
          
          if (aIsSignature && !bIsSignature) return -1;
          if (!aIsSignature && bIsSignature) return 1;
          
          // Within same type, sort by color order
          const colorOrder = ['pink', 'black', 'grey', 'stone'];
          const aColor = a.node.title.toLowerCase().split(' ').pop() || '';
          const bColor = b.node.title.toLowerCase().split(' ').pop() || '';
          return colorOrder.indexOf(aColor) - colorOrder.indexOf(bColor);
        });
        
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error loading hoodie products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ShopPageLayout
      title="Hoodies"
      description="Signature heavyweight Anti-Love hoodies, crafted for comfort and presence."
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
          No hoodies found.
        </div>
      )}
    </ShopPageLayout>
  );
};

export default ShopHoodies;
