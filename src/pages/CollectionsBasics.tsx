import { useEffect, useState } from "react";
import ShopPageLayout from "@/components/ShopPageLayout";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const CollectionsBasics = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch products tagged with 'basics'
        const allProducts = await fetchProducts(50, 'tag:basics');
        setProducts(allProducts);
      } catch (error) {
        console.error('Error loading basics products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ShopPageLayout
      title="ANTI-LOVE BASICS"
      description="Your daily uniform — refined essentials crafted for comfort, durability, and presence."
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
          Basics coming soon.
        </div>
      )}
    </ShopPageLayout>
  );
};

export default CollectionsBasics;
