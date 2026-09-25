import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { type Family, type Color, COLOR_ORDER } from "@/lib/catalog";
import { useCart } from "@/contexts/CartContext";
import { InterestModal } from "./InterestModal";

interface ProductCardProps {
  family: Family;
  color: Color;
  index?: number;
}

const ProductCard = ({
  family,
  color,
  index = 0,
}: ProductCardProps) => {
  const variant = family.variants.find(v => v.color === color)!;
  const href = `/products/${family.id}/${color}`;
  const { addToCart } = useCart();
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);

  // Determine product state
  const isPreSale = family.preSale;
  const hasBlackFriday = family.originalPrice && family.originalPrice > family.price;
  const isCreativeCollection = !isPreSale && family.soldOut;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const colorLabel = COLOR_ORDER.find((c) => c.key === color)?.label || variant.name;
    addToCart({
      productId: `${family.id}-${color}`,
      familyId: family.id,
      title: `${family.title} ${colorLabel}`,
      variantId: color,
      color,
      colorLabel,
      size: family.id === 'cap' || family.id === 'beanie' ? undefined : 'M',
      price: family.price,
      image: variant.images.front,
      maxQty: 10,
    });
  };
  
  return (
    <Link to={href} className="block">
      <article
      className="
        group relative
        rounded-2xl border border-white/10 bg-gradient-to-b from-[#111] to-[#0a0a0a]
        shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)]
        transition-all duration-400 ease-out
        hover:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)]
        hover:border-white/20
      "
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* MEDIA */}
      <div className="relative aspect-square rounded-2xl overflow-hidden">
        {/* Tags */}
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
          {/* Black Friday tag - highest priority */}
          {hasBlackFriday && (
            <span className="rounded-md border border-[#e9a8b2]/40 bg-[#e9a8b2]/90 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm shadow-lg">
              BLACK FRIDAY — 30% OFF
            </span>
          )}
          
          {/* Pre-sale tag */}
          {isPreSale && (
            <span className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
              PRE-SALE
            </span>
          )}
          
          {/* AL BASIC or New Drop tag - only show if not pre-sale and not creative collection */}
          {!isPreSale && !hasBlackFriday && !isCreativeCollection && family.id !== 'hooded-bomber' && family.id !== 'puffer-jacket' && !family.collectionTags?.includes('signature') && (
            <span className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
              {family.id === 'tshirt' || family.id === 'hoodie' || family.id === 'joggers' || family.id === 'cap' || family.id === 'beanie' ? 'AL BASIC' : 'New Drop'}
            </span>
          )}
          
          {/* Creative Collection tag - only show if not pre-sale */}
          {isCreativeCollection && !isPreSale && !hasBlackFriday && (
            <span className="rounded-full border border-white/20 bg-white/[0.08] px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-white/70 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
              CREATIVE COLLECTION
            </span>
          )}
        </div>

        {/* Spotlight gradient (subtle) */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 55%)",
          }}
        />

        {/* Product image */}
        <img
          src={variant.images.front}
          alt={`${family.title} ${variant.name}`}
          className="
            absolute inset-0 m-auto
            h-[88%] w-[88%] object-contain
            transition-transform duration-500 ease-out
            group-hover:scale-[1.03]
            will-change-transform
          "
        />
      </div>

      {/* INFO (outside media area) */}
      <div className="px-5 pb-5 pt-4">
        {/* Name + Price */}
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3
            className="
              font-sans text-[1.05rem] font-semibold
              text-white tracking-tight
            "
          >
            {family.title} {variant.name}
          </h3>
          <div className="shrink-0 text-right">
            {hasBlackFriday ? (
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-xs text-white/40 line-through">
                  £{family.originalPrice}
                </span>
                <span className="font-sans text-[1rem] font-extrabold text-[#e9a8b2]">
                  £{family.price}
                </span>
              </div>
            ) : (
              <div
                className="
                  font-sans text-[1rem] font-extrabold
                  text-white whitespace-nowrap
                "
              >
                £{family.price}
              </div>
            )}
          </div>
        </div>

        {/* Color Swatches */}
        <div className="mb-4 flex flex-wrap gap-2">
          {COLOR_ORDER
            .filter(c => family.variants.some(v => v.color === c.key))
            .map((c) => {
              const colorMap: Record<string, string> = {
                pink: '#f3b6c1',
                'royal-blue': '#0d2a7d',
                black: '#111',
                white: '#f5f5f5',
                navy: '#1b2a49',
                stone: '#d6c5ac',
                red: '#a22b2b',
                grey: '#777',
                green: '#3e5d52'
              };
              
              return (
                <div
                  key={c.key}
                  className={`w-6 h-6 rounded-full border-2 ${c.key === color ? 'border-white shadow-[0_0_0_2px_rgba(255,255,255,0.2)]' : c.key === 'white' ? 'border-[#bbb]' : 'border-white/45'}`}
                  style={{ backgroundColor: colorMap[c.key] || '#888' }}
                  title={c.label}
                />
              );
            })}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            className="
              flex-1 rounded-lg border border-white/20
              bg-transparent px-4 py-3
              text-xs font-extrabold uppercase tracking-[0.12em]
              text-white transition-all duration-300
              hover:border-white hover:bg-white hover:text-black
            "
          >
            View
          </Button>
          {isCreativeCollection ? (
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsInterestModalOpen(true);
              }}
              className="
                flex-1 rounded-lg border border-primary/50
                bg-transparent px-4 py-3
                text-xs font-extrabold uppercase tracking-[0.12em]
                text-primary transition-all duration-300
                hover:border-primary hover:bg-primary/10
              "
            >
              I'm Interested
            </Button>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="
                flex-1 rounded-lg border border-primary/50
                bg-primary/20 px-4 py-3
                text-xs font-extrabold uppercase tracking-[0.12em]
                text-primary transition-all duration-300
                hover:border-primary hover:bg-primary hover:text-primary-foreground
              "
            >
              {isPreSale ? "PRE ORDER" : "Add to Cart"}
            </Button>
          )}
        </div>
        
        {/* Interest Modal */}
        <InterestModal
          isOpen={isInterestModalOpen}
          onClose={() => setIsInterestModalOpen(false)}
          productId={family.id}
          productHandle={family.id}
          productTitle={`${family.title} ${variant.name}`}
          styleCode={family.styleCode}
          availableSizes={family.id === 'cap' || family.id === 'beanie' ? ['One Size'] : ['S', 'M', 'L', 'XL', 'XXL']}
          availableColours={COLOR_ORDER.filter(c => family.variants.some(v => v.color === c.key)).map(c => c.label)}
        />
      </div>
    </article>
    </Link>
  );
};

export default ProductCard;
