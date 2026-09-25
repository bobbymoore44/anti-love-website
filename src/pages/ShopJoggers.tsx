import { useEffect, useState } from "react";
import ShopPageLayout from "@/components/ShopPageLayout";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const ShopJoggers = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch jogger products in the correct order: Pink, Grey, Black, Stone
        const allProducts = await fetchProducts(50, 'tag:anti-love-jogger');
        
        // Sort products by color order
        const colorOrder = ['pink', 'grey', 'black', 'stone'];
        const sortedProducts = allProducts.sort((a, b) => {
          const aColor = a.node.title.toLowerCase().split(' ').pop() || '';
          const bColor = b.node.title.toLowerCase().split(' ').pop() || '';
          return colorOrder.indexOf(aColor) - colorOrder.indexOf(bColor);
        });
        
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error loading jogger products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ShopPageLayout
      title="Joggers"
      description="Relaxed silhouettes and refined minimalism — the Anti-Love joggers."
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
          No joggers found.
        </div>
      )}
    </ShopPageLayout>
  );
};

export default ShopJoggers;
