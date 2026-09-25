import { useEffect, useState } from "react";
import ShopPageLayout from "@/components/ShopPageLayout";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const CollectionsCreative = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch products tagged with 'creative-collection'
        const allProducts = await fetchProducts(50, 'tag:creative-collection');
        setProducts(allProducts);
      } catch (error) {
        console.error('Error loading Creative Collection products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ShopPageLayout
      title="CREATIVE COLLECTION"
      description="These are unreleased studio samples shown to express the brand's creative collection."
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
              hidePrice
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-white/60 py-24">
          No creative pieces available right now.
        </div>
      )}
    </ShopPageLayout>
  );
};

export default CollectionsCreative;
