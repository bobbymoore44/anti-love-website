import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { InterestModal } from "./InterestModal";
import { FAMILY_BY_HANDLE } from "@/lib/productFamilies";
import { cn, formatPrice } from "@/lib/utils";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  index?: number;
  hidePrice?: boolean;
}

const ShopifyProductCard = ({ product, index = 0, hidePrice = false }: ShopifyProductCardProps) => {
  const { node } = product;
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  
  // Get product family for color swatches
  const productFamily = node.handle ? FAMILY_BY_HANDLE[node.handle] : undefined;
  
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currencyCode = node.priceRange.minVariantPrice.currencyCode;
  const image = node.images.edges[0]?.node.url;
  const firstVariant = node.variants.edges[0]?.node;
  const isAvailable = firstVariant?.availableForSale ?? false;
  
  // Check if any variant has compareAtPrice (indicates sale/discount)
  const hasDiscount = node.variants.edges.some(v => v.node.compareAtPrice);
  const compareAtPrice = firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : null;
  
  // Determine product state
  const isPreSale = node.tags?.includes('pre-sale');
  const hasBlackFriday = compareAtPrice !== null && compareAtPrice > price; // Show Black Friday if compareAtPrice exists and is higher
  // Creative Collection: tagged with 'signature' or 'creative-collection' (but NOT pre-sale, which takes precedence)
  const isCreativeCollection = !isPreSale && (node.tags?.includes('signature') || node.tags?.includes('creative-collection'));
  
  // Auto-hide price for Creative Collection
  const shouldHidePrice = hidePrice || isCreativeCollection;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) {
      toast.error("Product unavailable");
      return;
    }

    // Only block if it's NOT a pre-sale product
    if (!isAvailable && !isPreSale) {
      toast.error("Product unavailable");
      return;
    }

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions,
    });

    toast.success(isPreSale ? "Pre-order added to cart" : "Added to cart", {
      description: node.title,
    });
  };

  return (
    <Link to={`/product/${node.handle}`} className="block">
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
          {(isPreSale || isCreativeCollection || hasBlackFriday) && (
            <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
              {hasBlackFriday && !shouldHidePrice && (
                <span className="rounded-md border border-[#e9a8b2]/40 bg-[#e9a8b2]/90 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm shadow-lg">
                  BLACK FRIDAY — 30% OFF
                </span>
              )}
              {isPreSale && !shouldHidePrice && (
                <span className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
                  PRE-SALE
                </span>
              )}
              {isCreativeCollection && !isPreSale && !hasBlackFriday && (
                <span className="rounded-full border border-white/20 bg-white/[0.08] px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-white/70 backdrop-blur-sm">
                  CREATIVE COLLECTION
                </span>
              )}
            </div>
          )}

          {/* Spotlight gradient */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              background: "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 55%)",
            }}
          />

          {/* Product image */}
          {image && (
            <img
              src={image}
              alt={node.title}
              className="absolute inset-0 m-auto h-[88%] w-[88%] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] will-change-transform"
            />
          )}
        </div>

        {/* INFO */}
        <div className="px-5 pb-5 pt-4">
          {/* Name + Price */}
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold tracking-tight text-white/95 line-clamp-2">
              {node.title}
            </h3>
            {!shouldHidePrice && (
              <div className="shrink-0 text-right">
                {hasBlackFriday && compareAtPrice ? (
                  <div className="flex flex-col items-end gap-0.5">
                    <p className="text-xs text-white/40 line-through">
                      {formatPrice(compareAtPrice.toString(), currencyCode)}
                    </p>
                    <p className="text-base font-bold tracking-tight text-[#e9a8b2]">
                      {formatPrice(price.toString(), currencyCode)}
                    </p>
                  </div>
                ) : (
                  <p className="text-base font-bold tracking-tight text-white/95">
                    {formatPrice(price.toString(), currencyCode)}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Color Swatches */}
          {productFamily && productFamily.options.length > 1 && (
            <div className="flex gap-1.5 justify-center mt-3">
              {productFamily.options.map((opt) => {
                const isActive = opt.handle === node.handle;
                
                // Map color keys to CSS colors
                const colorMap: Record<string, string> = {
                  pink: '#F4B8C3',
                  grey: '#808080',
                  black: '#000000',
                  stone: '#B8AA9A',
                  white: '#FFFFFF',
                  'royal-blue': '#4169E1',
                  blue: '#4169E1',
                  navy: '#001f3f',
                  red: '#DC143C',
                };
                
                const bgColor = colorMap[opt.key] || '#808080';
                
                return (
                  <button
                    key={opt.key}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!isActive) {
                        navigate(`/product/${opt.handle}`);
                      }
                    }}
                    className={cn(
                      'w-6 h-6 rounded-full border-2 transition-all duration-200',
                      isActive
                        ? 'border-white scale-110'
                        : 'border-white/30 hover:border-white/60 hover:scale-105'
                    )}
                    style={{ backgroundColor: bgColor }}
                    aria-label={`Switch to ${opt.label}`}
                  />
                );
              })}
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 border-white/20 hover:bg-white/10" asChild>
              <span>View</span>
            </Button>
            {isCreativeCollection ? (
              <Button
                size="sm"
                className="flex-1 border border-primary/50 bg-transparent text-primary hover:bg-primary/10"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsInterestModalOpen(true);
                }}
              >
                I'm Interested
              </Button>
            ) : (
              <Button
                size="sm"
                className="flex-1 bg-[#F3A6B2] hover:bg-[#F3A6B2]/90 text-black font-semibold"
                onClick={handleAddToCart}
              >
                {isPreSale ? "PRE ORDER" : "Add to Cart"}
              </Button>
            )}
          </div>
          
          <InterestModal
            isOpen={isInterestModalOpen}
            onClose={() => setIsInterestModalOpen(false)}
            productId={node.id}
            productHandle={node.handle}
            productTitle={node.title}
            availableSizes={node.options.find(opt => opt.name.toLowerCase() === 'size')?.values || ['S', 'M', 'L', 'XL']}
            availableColours={node.options.find(opt => opt.name.toLowerCase() === 'color')?.values || []}
          />
        </div>
      </article>
    </Link>
  );
};

export default ShopifyProductCard;
