import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { FAMILIES, COLOR_ORDER, type Color, type Family } from "@/lib/catalog";
import { useCart } from "@/contexts/CartContext";
import { InterestModal } from "@/components/InterestModal";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { FAMILY_BY_HANDLE } from "@/lib/productFamilies";
import { cn, formatPrice } from "@/lib/utils";

// Product information mapping
const getProductInfo = (title: string, handle: string) => {
  const titleLower = title.toLowerCase();
  const handleLower = handle.toLowerCase();
  
  // Anti-Love T-Shirt (Basic)
  if (handleLower.includes('anti-love-t-shirt') && !handleLower.includes('signature') && !handleLower.includes('fractured')) {
    return {
      description: "Crafted from soft 100% cotton, this essential T-shirt offers everyday comfort with a relaxed, oversized silhouette. Designed with a smooth finish and a reinforced neckline for durability, it pairs effortlessly with any wardrobe. The piece is finished with the Anti-Love branding on the front for a subtle, understated statement.",
      styleCode: "AL-TEE-007",
      details: [
        "100% Cotton",
        "Oversized fit",
        "Reinforced neckline",
        "Anti-Love branding on front"
      ]
    };
  }
  
  // Anti-Love Hoodie (Basic)
  if (handleLower.includes('anti-love-hoodie') && !handleLower.includes('signature')) {
    return {
      description: "Crafted from soft, mid-weight cotton fleece, this essential hoodie offers everyday comfort with a relaxed, easy-wear silhouette. Designed with a ribbed hem and cuffs for shape retention, it features a classic kangaroo pocket for practicality. The piece is finished with the Anti-Love branding on the front for a subtle, understated statement.",
      styleCode: "AL-HDY-008",
      details: [
        "Mid-weight cotton fleece",
        "Relaxed fit",
        "Ribbed hem and cuffs",
        "Kangaroo pocket",
        "Anti-Love branding on front"
      ]
    };
  }
  
  // Anti-Love Jogger
  if (handleLower.includes('anti-love-jogger')) {
    return {
      description: "Crafted from soft, mid-weight cotton fleece, these luxury basic joggers deliver everyday comfort with a clean, tapered silhouette. Designed with an elasticated waistband and drawcord for an adjustable fit, they feature smooth elasticated ankle openings for a refined finish and side pockets for practicality. The piece is completed with subtle Anti-Love branding on the front for a minimal, elevated look.",
      styleCode: "AL-JOG-009",
      details: [
        "Mid-weight cotton fleece",
        "Tapered silhouette",
        "Elasticated waistband with drawcord",
        "Elasticated ankle openings",
        "Side pockets",
        "Anti-Love branding on front"
      ]
    };
  }
  
  // Anti-Love Signature Hoodie
  if (handleLower.includes('signature-hoodie') || handleLower.includes('signature') && titleLower.includes('hoodie')) {
    return {
      description: "Crafted from premium 480GSM cotton with an ultra-soft finish, this signature hoodie delivers the perfect blend of structure and comfort. Cut in a relaxed oversized fit, it features a ribbed hem and cuffs for lasting shape and a classic kangaroo pocket. Finished with the bold Anti-Love motif across the chest and matching branding on the back, this piece makes a statement from every angle.",
      styleCode: "AL-SHD-001",
      details: [
        "480GSM premium cotton",
        "Relaxed oversized fit",
        "Ribbed hem and cuffs",
        "Kangaroo pocket",
        "Bold Anti-Love motif on chest",
        "Branding on back"
      ]
    };
  }
  
  // Anti-Love Signature Tee
  if (handleLower.includes('signature-tee') || handleLower.includes('signature') && (titleLower.includes('tee') || titleLower.includes('t-shirt'))) {
    return {
      description: "Crafted from soft, heavyweight cotton with a smooth finish, this signature T-shirt offers an elevated take on a wardrobe essential. Designed in an oversized fit, it features a structured drape and reinforced neckline for lasting shape. The piece is finished with the Anti-Love branding across the front, delivering a bold yet refined statement.",
      styleCode: "AL-TEE-006",
      details: [
        "Heavyweight cotton",
        "Oversized fit",
        "Structured drape",
        "Reinforced neckline",
        "Anti-Love branding across front"
      ]
    };
  }
  
  // Caps
  if (handleLower.includes('cap')) {
    return {
      description: "Crafted from 100% cotton twill with a smooth, structured finish, this signature baseball cap balances everyday comfort with a clean, classic silhouette. Designed in a traditional six-panel shape, it features embroidered eyelets for breathability and an adjustable fabric strap for a personalised fit. The cap is finished with the Anti-Love emblem embroidered across the front.",
      styleCode: "AL-CAP-002",
      details: [
        "100% cotton twill",
        "Six-panel construction",
        "Embroidered eyelets",
        "Adjustable fabric strap",
        "Anti-Love emblem on front"
      ]
    };
  }
  
  // Beanies
  if (handleLower.includes('beanie')) {
    return {
      description: "Crafted from a soft, heavyweight knit, this signature beanie delivers warmth, comfort and a clean, minimal profile. Designed with a classic cuffed silhouette for a secure fit, it features a dense rib texture that retains shape through daily wear. The piece is finished with the Anti-Love branding embroidered on the front for a subtle, refined statement.",
      styleCode: "AL-BEN-003",
      details: [
        "Heavyweight knit",
        "Classic cuffed silhouette",
        "Dense rib texture",
        "Shape-retaining design",
        "Anti-Love branding on front"
      ]
    };
  }
  
  // Puffer Jackets
  if (handleLower.includes('puffer')) {
    return {
      description: "Crafted with a lightweight yet insulated shell, this signature puffer jacket delivers warmth, comfort and a refined, minimal profile. Designed with a modern, slightly oversized silhouette, it features a quilted finish for even insulation and elasticated cuffs for a secure fit. The jacket includes zipped side pockets for practicality and is finished with the Anti-Love branding on the chest for a subtle, elevated statement.",
      styleCode: "AL-PUF-004",
      details: [
        "Lightweight insulated shell",
        "Slightly oversized silhouette",
        "Quilted finish",
        "Elasticated cuffs",
        "Zipped side pockets",
        "Anti-Love branding on chest"
      ]
    };
  }
  
  // Hooded Bomber Jackets
  if (handleLower.includes('bomber')) {
    return {
      description: "Crafted from a smooth, durable shell with a soft quilted lining, this signature bomber jacket delivers everyday comfort with a sharp, structured silhouette. Designed with classic ribbed cuffs, hem and collar, it offers a secure fit while maintaining a timeless profile. The jacket features discreet side pockets and a full-length zip, and is finished with the Anti-Love branding on the chest for a subtle, elevated statement.",
      styleCode: "AL-BOM-005",
      details: [
        "Durable shell with quilted lining",
        "Structured silhouette",
        "Ribbed cuffs, hem and collar",
        "Discreet side pockets",
        "Full-length zip",
        "Anti-Love branding on chest"
      ]
    };
  }
  
  // Fractured Love T-Shirts - keep existing descriptions
  if (handleLower.includes('fractured')) {
    return {
      description: "Crafted from ultra-soft heavyweight cotton, the Fractured Love T-Shirt combines structure, comfort, and statement design. Featuring an embossed Anti-Love chest emblem and the iconic fractured graphic across the back, this piece delivers a bold silhouette with a relaxed, true-to-size fit. Reinforced seams and premium fabric weight give the tee a durable, elevated feel—made for everyday wear with a luxury finish.",
      styleCode: "AL-TEE-FL",
      details: [
        "Ultra-soft heavyweight cotton",
        "Embossed Anti-Love chest emblem",
        "Fractured graphic on back",
        "Relaxed, true-to-size fit",
        "Reinforced seams"
      ]
    };
  }
  
  // Default fallback
  return null;
};

const ProductDetail = () => {
  const { family: familyParam, color: colorParam, slug } = useParams<{ family?: string; color?: string; slug?: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const addItemToShopifyCart = useCartStore(state => state.addItem);
  
  // State for Shopify products
  const [shopifyProduct, setShopifyProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [isShopifyProduct, setIsShopifyProduct] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Fetch Shopify product if using handle route
  useEffect(() => {
    if (slug) {
      setIsShopifyProduct(true);
      setLoading(true);
      fetchProducts(250).then(products => {
        const product = products.find(p => p.node.handle === slug);
        setShopifyProduct(product || null);
        if (product) {
          const firstVariant = product.node.variants.edges[0]?.node;
          setSelectedVariantId(firstVariant?.id || '');
          setSelectedImageIndex(0);
        }
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    } else {
      setIsShopifyProduct(false);
    }
  }, [slug]);

  // Get family data for legacy routes
  const family: Family | null = familyParam && (familyParam === 'hoodie' || familyParam === 'tshirt' || familyParam === 'joggers' || familyParam === 'fractured-love-tshirt' || familyParam === 'cap' || familyParam === 'puffer-jacket' || familyParam === 'hooded-bomber' || familyParam === 'beanie' || familyParam === 'signature-tshirt' || familyParam === 'signature-hoodie') 
    ? FAMILIES[familyParam as 'hoodie' | 'tshirt' | 'joggers' | 'fractured-love-tshirt' | 'cap' | 'puffer-jacket' | 'hooded-bomber' | 'beanie' | 'signature-tshirt' | 'signature-hoodie'] 
    : null;
  
  // Set initial color from URL
  const initialColor = colorParam as Color || 'pink';
  const [selectedColor, setSelectedColor] = useState<Color>(initialColor);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);

  // Determine product state
  const isPreSale = family?.preSale || false;
  const hasBlackFriday = family?.originalPrice && family.originalPrice > family.price;
  const isCreativeCollection = !isPreSale && (family?.soldOut || false);

  // Scroll to top on initial load and when URL changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [familyParam, colorParam]);

  // Update color when URL param changes
  useEffect(() => {
    if (colorParam && colorParam !== selectedColor) {
      setSelectedColor(colorParam as Color);
      setSelectedImage(0); // Reset to first image when color changes
    }
  }, [colorParam]);

  // Get current variant based on selected color
  const currentVariant = useMemo(
    () => family?.variants.find(v => v.color === selectedColor),
    [family, selectedColor]
  );


  // Handle color change - update URL and state
  const handleColorChange = (color: Color) => {
    if (color === selectedColor || !family) return;
    navigate(`/products/${family.id}/${color}`, { replace: true });
    setSelectedColor(color);
    setSelectedImage(0);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  // Loading state for Shopify products
  if (isShopifyProduct && loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
        <Footer />
      </div>
    );
  }

  // Handle Shopify product display
  if (isShopifyProduct && shopifyProduct) {
    const { node } = shopifyProduct;
    const price = parseFloat(node.priceRange.minVariantPrice.amount);
    const currencyCode = node.priceRange.minVariantPrice.currencyCode;
    const firstVariant = node.variants.edges[0]?.node;
    const compareAtPrice = firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : null;
    const hasBlackFriday = compareAtPrice !== null && compareAtPrice > price;
    const isPreSale = node.tags?.includes('pre-sale');
    const isCreativeCollection = !isPreSale && (node.tags?.includes('signature') || node.tags?.includes('creative-collection'));
    
    const selectedVariant = node.variants.edges.find(v => v.node.id === selectedVariantId)?.node || firstVariant;

    const handleAddToShopifyCart = () => {
      if (!selectedVariant) {
        toast.error("Product unavailable");
        return;
      }

      addItemToShopifyCart({
        product: shopifyProduct,
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        quantity: 1,
        selectedOptions: selectedVariant.selectedOptions,
      });

      toast.success(isPreSale ? "Pre-order added to cart" : "Added to cart", {
        description: node.title,
      });
    };

    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-12 max-w-[1400px]">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.12] text-white hover:bg-white/[0.12] hover:-translate-x-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/25 focus:ring-offset-2 focus:ring-offset-background mb-8"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/10">
                {node.images.edges[selectedImageIndex] && (
                  <img
                    src={node.images.edges[selectedImageIndex].node.url}
                    alt={node.title}
                    className="absolute inset-0 m-auto h-[85%] w-[85%] object-contain transition-all duration-300"
                  />
                )}
              </div>

              {node.images.edges.length > 1 && (
                <div className="flex gap-3">
                  {node.images.edges.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square w-20 rounded-lg overflow-hidden bg-gradient-to-b from-[#111] to-[#0a0a0a] border-2 transition-all duration-200 ${
                        selectedImageIndex === index ? 'border-primary' : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <img
                        src={image.node.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="absolute inset-0 m-auto h-[75%] w-[75%] object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {isCreativeCollection && (
                    <span className="inline-block px-3 py-1 rounded-md bg-white/10 border border-white/20 text-white/70 text-xs font-bold uppercase tracking-wider">
                      CREATIVE COLLECTION
                    </span>
                  )}
                  {!isCreativeCollection && isPreSale && (
                    <span className="inline-block px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white/90 text-xs font-extrabold uppercase tracking-[0.12em]">
                      PRE-SALE
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                  {node.title}
                </h1>
                {!isCreativeCollection && (
                  <>
                    <div className="space-y-3">
                      {hasBlackFriday ? (
                        <div className="flex items-center gap-3">
                          <span className="text-lg text-white/40 line-through">
                            {formatPrice(compareAtPrice?.toString() || '0', currencyCode)}
                          </span>
                          <span className="text-3xl font-bold text-[#e9a8b2]">
                            {formatPrice(price.toString(), currencyCode)}
                          </span>
                        </div>
                      ) : (
                        <div className="text-3xl font-bold text-foreground">
                          {formatPrice(price.toString(), currencyCode)}
                        </div>
                      )}
                    </div>
                    
                    {hasBlackFriday && (
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-4 py-2 rounded-md bg-[#e9a8b2] text-white text-xs font-extrabold uppercase tracking-[0.12em] shadow-lg">
                          BLACK FRIDAY — 30% OFF
                        </span>
                      </div>
                    )}
                  </>
                 )}
                </div>

              {/* COLOUR selector for hoodie family */}
              {(() => {
                const productHandle = node.handle;
                const productFamily = productHandle ? FAMILY_BY_HANDLE[productHandle] : undefined;
                
                if (productFamily) {
                  return (
                    <div>
                      <p className="text-xs tracking-[0.12em] font-semibold text-white/60 mb-2 uppercase">
                        COLOUR
                      </p>
                      <div className="flex gap-2">
                        {productFamily.options.map((opt) => {
                          const isActive = opt.handle === productHandle;
                          
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => {
                                if (isActive) return;
                                navigate(`/product/${opt.handle}`);
                              }}
                              className={cn(
                                'h-9 px-4 rounded-full border text-xs font-medium transition-colors',
                                isActive
                                  ? 'bg-white text-black border-white'
                                  : 'bg-transparent text-white/70 border-white/20 hover:border-white/60 hover:text-white'
                              )}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Variant Selector (Size) */}
              {node.options.map(option => {
                const optionValues = [...new Set(node.variants.edges.map(v => 
                  v.node.selectedOptions.find(o => o.name === option.name)?.value
                ).filter(Boolean))];

                if (optionValues.length <= 1) return null;

                const currentValue = selectedVariant?.selectedOptions.find(o => o.name === option.name)?.value;

                return (
                  <div key={option.name}>
                    <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {optionValues.map(value => {
                        const variant = node.variants.edges.find(v =>
                          v.node.selectedOptions.some(o => o.name === option.name && o.value === value)
                        )?.node;
                        
                        return (
                          <button
                            key={value}
                            onClick={() => variant && setSelectedVariantId(variant.id)}
                            className={`px-4 py-2 rounded-md border text-sm font-medium transition-all duration-200 ${
                              currentValue === value
                                ? 'border-primary bg-primary/10 text-foreground'
                                : 'border-white/20 bg-white/5 text-muted-foreground hover:border-white/40'
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Add to Cart / Interest Button */}
              {isCreativeCollection ? (
                <div className="space-y-3">
                  <Button
                    onClick={() => setIsInterestModalOpen(true)}
                    className="w-full h-12 text-sm font-bold uppercase tracking-wider border border-primary/50 bg-transparent text-primary hover:bg-primary/10"
                    size="lg"
                  >
                    I'm Interested in This Piece
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    This is an unreleased studio sample shown to express the brand's creative collection.
                  </p>
                </div>
              ) : (
                <Button
                  onClick={handleAddToShopifyCart}
                  className="w-full h-12 text-sm font-bold uppercase tracking-wider bg-[#F3A6B2] hover:bg-[#F3A6B2]/90 text-black"
                  size="lg"
                >
                  {isPreSale ? "PRE ORDER" : "Add to Cart"}
                </Button>
              )}

              {!isPreSale && !isCreativeCollection && (
                <p className="text-sm text-muted-foreground border-t border-white/10 pt-6">
                  Free UK shipping • Worldwide available
                </p>
              )}

              {/* DESCRIPTION - Below CTA */}
              {(() => {
                const productInfo = getProductInfo(node.title, node.handle);
                if (productInfo) {
                  return (
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                        DESCRIPTION
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {productInfo.description}
                      </p>
                    </div>
                  );
                }
                return null;
              })()}

              {/* DETAILS - Below Description */}
              {(() => {
                const productInfo = getProductInfo(node.title, node.handle);
                if (productInfo && productInfo.details) {
                  return (
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                        DETAILS
                      </h3>
                      <ul className="space-y-2">
                        {productInfo.details.map((detail, index) => (
                          <li key={index} className="text-muted-foreground text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              })()}

              {/* PRODUCT STYLE CODE - Below Details */}
              {(() => {
                const productInfo = getProductInfo(node.title, node.handle);
                if (productInfo && productInfo.styleCode) {
                  return (
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                        PRODUCT STYLE CODE
                      </h3>
                      <p className="text-foreground font-semibold tracking-wider">
                        {productInfo.styleCode}
                      </p>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        </main>
        
        <InterestModal
          isOpen={isInterestModalOpen}
          onClose={() => setIsInterestModalOpen(false)}
          productId={node.id}
          productHandle={node.handle}
          productTitle={node.title}
          styleCode={node.tags?.find(tag => tag.startsWith('AL-'))?.toUpperCase() || ''}
          availableSizes={node.options.find(opt => opt.name.toLowerCase() === 'size')?.values || ['S', 'M', 'L', 'XL']}
          availableColours={node.options.find(opt => opt.name.toLowerCase() === 'color')?.values || []}
        />
        
        <Footer />
      </div>
    );
  }

  // Handle 404
  if ((!family || !currentVariant) && !isShopifyProduct) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/shop">
            <Button>Browse Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!family || !currentVariant) {
    return null;
  }

  // Check if it's a single-image product (front and back are the same)
  const isSingleImage = currentVariant.images.front === currentVariant.images.back;
  
  const images = isSingleImage 
    ? [{ src: currentVariant.images.front, alt: `${family.title} ${currentVariant.name}` }]
    : [
        { src: currentVariant.images.front, alt: `${family.title} ${currentVariant.name} - Front View` },
        { src: currentVariant.images.back, alt: `${family.title} ${currentVariant.name} - Back View` },
        ...(currentVariant.images.detail ? [{ src: currentVariant.images.detail, alt: `${family.title} ${currentVariant.name} - Detail View` }] : []),
      ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-12 max-w-[1400px]">
        {/* Back Button */}
        <button 
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
              window.location.href = document.referrer;
            } else {
              navigate('/shop');
            }
          }}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.12] text-white hover:bg-white/[0.12] hover:-translate-x-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/25 focus:ring-offset-2 focus:ring-offset-background mb-8"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/10">
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="absolute inset-0 m-auto h-[85%] w-[85%] object-contain transition-all duration-300"
              />
            </div>

            {/* Thumbnails - Only show if multiple images */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`
                      relative aspect-square w-20 rounded-lg overflow-hidden
                      bg-gradient-to-b from-[#111] to-[#0a0a0a]
                      border-2 transition-all duration-200
                      ${selectedImage === index ? 'border-primary' : 'border-white/10 hover:border-white/20'}
                    `}
                  >
                    <img
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      className="absolute inset-0 m-auto h-[75%] w-[75%] object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
          <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {family.collectionTags?.includes('signature') && (
                  <span className="inline-block px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                    AL SIGNATURE
                  </span>
                )}
                {isCreativeCollection && (
                  <span className="inline-block px-3 py-1 rounded-md bg-white/10 border border-white/20 text-white/70 text-xs font-bold uppercase tracking-wider">
                    CREATIVE COLLECTION
                  </span>
                )}
                {!family.collectionTags?.includes('signature') && !isCreativeCollection && family.isNew && (
                  <span className="inline-block px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                    New Drop
                  </span>
                )}
                {!isCreativeCollection && isPreSale && (
                  <span className="inline-block px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white/90 text-xs font-extrabold uppercase tracking-[0.12em]">
                    PRE-SALE
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                {family.title} <span className="text-foreground/70">{currentVariant.name}</span>
              </h1>
              <div className="space-y-3">
                {hasBlackFriday ? (
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-white/40 line-through">
                      £{family.originalPrice}
                    </span>
                    <span className="text-3xl font-bold text-[#e9a8b2]">
                      £{family.price}
                    </span>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-foreground">
                    £{family.price}
                  </div>
                )}
                
                {/* Black Friday Badge */}
                {hasBlackFriday && (
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-4 py-2 rounded-md bg-[#e9a8b2] text-white text-xs font-extrabold uppercase tracking-[0.12em] shadow-lg">
                      BLACK FRIDAY — 30% OFF
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Color Selector - synced to URL */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Colour
              </label>
              <div className="flex flex-wrap gap-3">
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
                      <button
                        key={c.key}
                        onClick={() => handleColorChange(c.key)}
                        className={`
                          w-7 h-7 rounded-full border-2 transition-all duration-200
                          hover:scale-110
                          ${selectedColor === c.key
                            ? 'border-white shadow-[0_0_0_2px_rgba(255,255,255,0.2)] scale-110'
                            : c.key === 'white' ? 'border-[#bbb]' : 'border-[#666]'
                          }
                        `}
                        style={{ backgroundColor: colorMap[c.key] || '#888' }}
                        aria-label={c.label}
                        title={c.label}
                      />
                    );
                  })}
              </div>
            </div>

            {/* Size Selector - Show appropriate sizing based on product type */}
            {family.id === 'beanie' ? (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  Size
                </label>
                <div className="inline-block px-4 py-2 rounded-md border border-primary bg-primary/10 text-foreground text-sm font-medium">
                  One Size Fits All
                </div>
              </div>
            ) : family.id === 'cap' ? (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  Size
                </label>
                <div className="inline-block px-4 py-2 rounded-md border border-primary bg-primary/10 text-foreground text-sm font-medium">
                  One Size
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {(family.id === 'signature-tshirt' || family.id === 'signature-hoodie' || family.id === 'hoodie' || family.id === 'tshirt' || family.id === 'joggers' || family.id === 'fractured-love-tshirt' ? ['S', 'M', 'L'] : family.id === 'puffer-jacket' || family.id === 'hooded-bomber' ? ['S', 'M', 'L', 'XL'] : ['S', 'M', 'L', 'XL', 'XXL']).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        w-16 py-2 rounded-md border text-sm font-medium
                        transition-all duration-200
                        ${selectedSize === size
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-white/20 bg-white/5 text-muted-foreground hover:border-white/40'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart / Creative Collection Interest */}
            {isCreativeCollection ? (
              <div className="space-y-3">
                <Button
                  onClick={() => setIsInterestModalOpen(true)}
                  className="w-full h-12 text-sm font-bold uppercase tracking-wider border border-primary/50 bg-transparent text-primary hover:bg-primary/10"
                  size="lg"
                >
                  I'm Interested in This Piece
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  This is an unreleased studio sample shown to express the brand's creative collection.
                </p>
              </div>
            ) : (
              <Button
                onClick={() => {
                  if (family.id !== 'cap' && family.id !== 'beanie' && !selectedSize) {
                    alert('Please select a size');
                    return;
                  }
                  const colorLabel = COLOR_ORDER.find((c) => c.key === selectedColor)?.label || currentVariant.name;
                  addToCart({
                    productId: `${family.id}-${selectedColor}`,
                    familyId: family.id,
                    title: `${family.title} ${colorLabel}`,
                    variantId: selectedColor,
                    color: selectedColor,
                    colorLabel,
                    size: selectedSize || undefined,
                    price: family.price,
                    image: currentVariant.images.front,
                    maxQty: 10,
                  });
                }}
                className="w-full h-12 text-sm font-bold uppercase tracking-wider"
                size="lg"
              >
                {isPreSale ? "PRE ORDER" : "Add to Cart"}
              </Button>
            )}

            {/* Shipping Info */}
            {!isPreSale && (
              <p className="text-sm text-muted-foreground border-t border-white/10 pt-6">
                Free UK shipping • Worldwide available
              </p>
            )}

            {/* DESCRIPTION - Below CTA */}
            {(currentVariant.description || family.description) && (
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  DESCRIPTION
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {currentVariant.description || family.description}
                </p>
              </div>
            )}

            {/* DETAILS - Below Description */}
            {family.details && family.details.length > 0 && (
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  DETAILS
                </h3>
                <ul className="space-y-2">
                  {family.details.map((detail, index) => (
                    <li key={index} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* PRODUCT STYLE CODE - Below Details */}
            {family.styleCode && (
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  PRODUCT STYLE CODE
                </h3>
                <p className="text-foreground font-semibold tracking-wider">
                  {family.styleCode}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Items */}
        <section className="mt-14 pt-8 border-t border-white/10">
          <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wider">
            {family.collectionTags?.includes('signature') ? 'More from Signature' : 'Related Items'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {family.collectionTags?.includes('signature') ? (
              // For Signature products, show all color variants from other signature families
              Object.values(FAMILIES)
                .filter(f => f.id !== family.id && f.collectionTags?.includes('signature'))
                .flatMap(relatedFamily => 
                  relatedFamily.variants.map(variant => ({
                    family: relatedFamily,
                    variant
                  }))
                )
                .slice(0, 4)
                .map(({ family: relatedFamily, variant }) => (
                  <Link 
                    key={`${relatedFamily.id}-${variant.color}`}
                    to={`/products/${relatedFamily.id}/${variant.color}`}
                    className="group block"
                  >
                    <article className="rounded-2xl border border-white/[0.08] bg-white/[0.04] overflow-hidden transition-all duration-300 hover:border-white/20">
                      <div className="aspect-square relative bg-gradient-to-b from-[#111] to-[#0a0a0a]">
                        {/* Tags */}
                        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                          {/* PRE-SALE Tag */}
                          {relatedFamily.preSale && (
                            <div className="inline-flex items-center justify-center px-[18px] py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.08em] bg-[#f4a9b9] text-white shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
                              PRE-SALE
                            </div>
                          )}
                          
                          {/* CREATIVE COLLECTION Tag */}
                          {!relatedFamily.preSale && relatedFamily.soldOut && (
                            <div className="inline-flex items-center justify-center px-[18px] py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.08em] bg-[#2b2b2f] text-white shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
                              CREATIVE COLLECTION
                            </div>
                          )}
                        </div>
                        
                        <img
                          src={variant.images.front} 
                          alt={`${relatedFamily.title} ${variant.name}`}
                          className="absolute inset-0 m-auto h-[85%] w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3.5">
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <h3 className="font-semibold text-foreground text-sm">
                            {relatedFamily.title}
                          </h3>
                          <div className="font-bold text-foreground text-sm whitespace-nowrap">
                            £{relatedFamily.price}
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-muted-foreground">
                            {variant.name}
                          </p>
                          {(!relatedFamily.preSale && relatedFamily.soldOut) ? (
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsInterestModalOpen(true);
                              }}
                              className="h-8 px-3 text-xs font-bold uppercase tracking-wider rounded-lg border border-primary/50 bg-transparent text-primary hover:bg-primary/10"
                            >
                              Interested
                            </Button>
                          ) : (
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const colorLabel = COLOR_ORDER.find((c) => c.key === variant.color)?.label || variant.name;
                                addToCart({
                                  productId: `${relatedFamily.id}-${variant.color}`,
                                  familyId: relatedFamily.id,
                                  title: `${relatedFamily.title} ${colorLabel}`,
                                  variantId: variant.color,
                                  color: variant.color,
                                  colorLabel,
                                  size: relatedFamily.id === 'cap' || relatedFamily.id === 'beanie' ? undefined : 'M',
                                  price: relatedFamily.price,
                                  image: variant.images.front,
                                  maxQty: 10,
                                });
                              }}
                              className="h-8 px-3 text-xs font-bold uppercase tracking-wider rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))
            ) : (
              // For non-signature products, show one variant per family (old behavior)
              Object.values(FAMILIES)
                .filter(f => f.id !== family.id)
                .slice(0, 4)
                .map(relatedFamily => {
                  const relatedVariant = relatedFamily.variants[0];
                  return (
                    <Link 
                      key={relatedFamily.id}
                      to={`/products/${relatedFamily.id}/${relatedVariant.color}`}
                      className="group block"
                    >
                      <article className="rounded-2xl border border-white/[0.08] bg-white/[0.04] overflow-hidden transition-all duration-300 hover:border-white/20">
                        <div className="aspect-square relative bg-gradient-to-b from-[#111] to-[#0a0a0a]">
                          {/* Tags */}
                          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                            {/* PRE-SALE Tag */}
                            {relatedFamily.preSale && (
                              <div className="inline-flex items-center justify-center px-[18px] py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.08em] bg-[#f4a9b9] text-white shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
                                PRE-SALE
                              </div>
                            )}
                            
                            {/* CREATIVE COLLECTION Tag */}
                            {!relatedFamily.preSale && relatedFamily.soldOut && (
                              <div className="inline-flex items-center justify-center px-[18px] py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.08em] bg-[#2b2b2f] text-white shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
                                CREATIVE COLLECTION
                              </div>
                            )}
                          </div>
                          
                          <img
                            src={relatedVariant.images.front} 
                            alt={`${relatedFamily.title} ${relatedVariant.name}`}
                            className="absolute inset-0 m-auto h-[85%] w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3.5">
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <h3 className="font-semibold text-foreground text-sm">
                              {relatedFamily.title}
                            </h3>
                            <div className="font-bold text-foreground text-sm whitespace-nowrap">
                              £{relatedFamily.price}
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex gap-1.5">
                              {COLOR_ORDER
                                .filter(c => relatedFamily.variants.some(v => v.color === c.key))
                                .slice(0, 4)
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
                                      className={`w-[22px] h-[22px] rounded-full border-2 ${c.key === 'white' ? 'border-[#bbb]' : 'border-white/45'}`}
                                      style={{ backgroundColor: colorMap[c.key] || '#888' }}
                                      title={c.label}
                                    />
                                  );
                                })}
                            </div>
                          {(!relatedFamily.preSale && relatedFamily.soldOut) ? (
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsInterestModalOpen(true);
                              }}
                              className="h-8 px-3 text-xs font-bold uppercase tracking-wider rounded-lg border border-primary/50 bg-transparent text-primary hover:bg-primary/10"
                            >
                              Interested
                            </Button>
                          ) : (
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const colorLabel = COLOR_ORDER.find((c) => c.key === relatedVariant.color)?.label || relatedVariant.name;
                                addToCart({
                                  productId: `${relatedFamily.id}-${relatedVariant.color}`,
                                  familyId: relatedFamily.id,
                                  title: `${relatedFamily.title} ${colorLabel}`,
                                  variantId: relatedVariant.color,
                                  color: relatedVariant.color,
                                  colorLabel,
                                  size: relatedFamily.id === 'cap' || relatedFamily.id === 'beanie' ? undefined : 'M',
                                  price: relatedFamily.price,
                                  image: relatedVariant.images.front,
                                  maxQty: 10,
                                });
                              }}
                              className="h-8 px-3 text-xs font-bold uppercase tracking-wider rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })
            )}
          </div>
        </section>
      </main>

      {/* Interest Modal */}
      <InterestModal
        isOpen={isInterestModalOpen}
        onClose={() => setIsInterestModalOpen(false)}
        productId={family.id}
        productHandle={family.id}
        productTitle={`${family.title} ${currentVariant?.name || ''}`}
        styleCode={family.styleCode}
        availableSizes={family.id === 'cap' || family.id === 'beanie' ? ['One Size'] : ['S', 'M', 'L', 'XL', 'XXL']}
        availableColours={COLOR_ORDER.filter(c => family.variants.some(v => v.color === c.key)).map(c => c.label)}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail;
