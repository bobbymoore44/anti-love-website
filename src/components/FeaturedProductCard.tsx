import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { type ShopifyProduct } from "@/lib/shopify";
import { InterestModal } from "./InterestModal";
import { formatPrice } from "@/lib/utils";

interface FeaturedProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

const FeaturedProductCard = ({
  product,
  index = 0,
}: FeaturedProductCardProps) => {
  const { node } = product;
  const href = `/product/${node.handle}`;
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);

  // Determine product state
  const isPreSale = node.tags.includes('pre-sale');
  const isCreativeCollection = node.tags.includes('creative-collection') || node.tags.includes('signature');
  
  const price = node.priceRange.minVariantPrice.amount;
  const currencyCode = node.priceRange.minVariantPrice.currencyCode;
  const image = node.images.edges[0]?.node.url || '';
  
  // Define tag text (always show "Featured")
  const getTag = () => 'FEATURED';
  
  return (
    <Link to={href} className="block w-full">
      <article
      className="
        group relative
        w-full
        max-w-[460px]
        min-h-[540px]
        mx-auto
        flex flex-col justify-between
        rounded-[24px]
        bg-gradient-to-b from-[#0a0a0d] via-[#0d0d11] to-[#111]
        border border-white/5
        shadow-[0_20px_50px_rgba(0,0,0,0.6)]
        transition-all duration-250 ease-out
        hover:-translate-y-2
        hover:border-primary/30
        hover:shadow-[0_28px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(243,182,193,0.15)]
        will-change-transform
        animate-fade-in
        overflow-hidden
      "
      style={{ 
        animationDelay: `${index * 0.12}s`,
        animationFillMode: 'both'
      }}
    >
      {/* IMAGE AREA - Product stage */}
      <div className="relative flex items-center justify-center overflow-visible h-[260px] sm:h-[280px] md:h-[300px] pt-6">
        {/* Tags Container */}
        <div className="absolute left-6 top-8 z-10 flex flex-col gap-2">
          {/* Featured Tag with spark icon */}
          <span
            className="
              inline-flex items-center gap-1.5
              px-3.5 py-1.5
              rounded-full 
              bg-gradient-to-br from-primary/95 to-primary/85
              text-primary-foreground
              text-[10px] font-bold uppercase tracking-[0.18em]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_12px_rgba(243,182,193,0.4)]
              transition-all duration-250 ease-out
              group-hover:-translate-y-1 
              group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_20px_rgba(243,182,193,0.6)]
            "
          >
            <Sparkles className="w-3 h-3" strokeWidth={2.5} />
            {getTag()}
          </span>

          {/* Creative Collection Tag */}
          {isCreativeCollection && (
            <span
              className="
                px-2.5 py-1
                rounded-md
                bg-white/5
                backdrop-blur-sm
                text-white/50
                text-[9px] font-medium uppercase tracking-[0.12em]
                border border-white/10
              "
            >
              Creative Collection
            </span>
          )}
        </div>

        {/* Product image with soft hover lift */}
        <img
          src={image}
          alt={node.title}
          className={`mx-auto object-contain transition-all duration-300 ease-out will-change-transform ${
            node.handle === 'anti-love-cap-white'
              ? 'w-[70%] group-hover:scale-[1.03]'
              : 'w-[82%] max-h-[230px] sm:max-h-[250px] md:max-h-[270px] group-hover:scale-[1.06] group-hover:-translate-y-1'
          }`}
          style={{
            filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.5))"
          }}
        />
      </div>

      {/* CONTENT BLOCK - Info section */}
      <div className="flex flex-col gap-2.5 px-7 pb-6 pt-2">
        {/* Name + Price row */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[16px] font-bold leading-tight text-white">
            {node.title}
          </h3>
          {!isCreativeCollection && (
            <div className="text-[16px] font-bold text-primary whitespace-nowrap">
              {formatPrice(price, currencyCode)}
            </div>
          )}
        </div>

        {/* BUTTONS - Premium CTAs */}
        <div className="flex flex-col gap-2 pt-6">
          <Button
            className="
              w-full
              border border-white/30
              text-[12px] font-semibold uppercase tracking-[0.14em]
              py-3
              rounded-full
              text-white bg-transparent
              hover:bg-white/8
              hover:border-white/50
              transition-all duration-250
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
                w-full
                bg-transparent
                border border-primary/50
                text-primary
                text-[12px] font-bold uppercase tracking-[0.14em]
                py-3
                rounded-full
                hover:bg-primary/10
                transition-all duration-250
              "
            >
              I'm Interested
            </Button>
          ) : null}
        </div>
        
        {/* Interest Modal */}
        {isCreativeCollection && (
          <InterestModal
            isOpen={isInterestModalOpen}
            onClose={() => setIsInterestModalOpen(false)}
            productId={node.handle}
            productHandle={node.handle}
            productTitle={node.title}
            styleCode={node.handle}
            availableSizes={node.variants.edges[0]?.node.selectedOptions.find(o => o.name === 'Size')?.value ? 
              node.variants.edges.map(v => v.node.selectedOptions.find(o => o.name === 'Size')?.value).filter(Boolean) as string[] : 
              ['One Size']}
            availableColours={[node.title.split(' ').pop() || 'Default']}
          />
        )}
      </div>
    </article>
    </Link>
  );
};

export default FeaturedProductCard;
