import { useEffect, useState } from "react";
import ShopPageLayout from "@/components/ShopPageLayout";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const ShopNew = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Specific product handles for New Arrivals
  const newArrivalHandles = [
    'fractured-love-t-shirt-white',
    'fractured-love-t-shirt-black',
    'anti-love-puffer-jacket-black',
    'anti-love-puffer-jacket-navy',
    'anti-love-puffer-jacket-red',
    'anti-love-jogger-pink',
    'anti-love-jogger-grey',
    'anti-love-jogger-black',
    'anti-love-jogger-stone',
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Fetch all products and filter by handles
        const allProducts = await fetchProducts(50);
        const filteredProducts = allProducts.filter(product => 
          newArrivalHandles.includes(product.node.handle)
        );
        
        // Sort products to match the order specified in newArrivalHandles
        const sortedProducts = filteredProducts.sort((a, b) => {
          const indexA = newArrivalHandles.indexOf(a.node.handle);
          const indexB = newArrivalHandles.indexOf(b.node.handle);
          return indexA - indexB;
        });
        
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error loading new arrivals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ShopPageLayout
      title="New Arrivals"
      description="Fresh off the drop — discover the latest Anti-Love arrivals."
    >
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="aspect-square bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ShopifyProductCard
              key={product.node.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      )}
    </ShopPageLayout>
  );
};

export default ShopNew;
