import { useEffect, useState } from "react";
import ShopifyProductCard from "./ShopifyProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

const CapsSection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(250).then(allProducts => {
      // Filter for individual cap color products
      const caps = allProducts.filter(p => 
        p.node.tags?.includes('anti-love-cap')
      );
      setProducts(caps);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="al-section py-14 px-4 md:px-6 lg:px-8 bg-background">
        <div className="max-w-[1680px] mx-auto flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  return (
    <section className="al-section py-14 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-[1680px] mx-auto">
        {/* Section Title - Left Aligned */}
        <h2 className="al-section-title">
          OUR CAPS
        </h2>
        <div className="al-title-rule" />

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {products.map((product, index) => (
            <ShopifyProductCard
              key={product.node.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapsSection;
