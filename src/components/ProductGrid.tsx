import ProductCard from "./ProductCard";
import { type Family, type Color } from "@/lib/catalog";

interface ProductGridProps {
  items: Array<{ family: Family; color: Color }>;
}

const ProductGrid = ({ items }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((item, index) => (
        <ProductCard
          key={`${item.family.id}-${item.color}`}
          family={item.family}
          color={item.color}
          index={index}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
