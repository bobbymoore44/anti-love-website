import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ShopPageLayout from "@/components/ShopPageLayout";
import { FilterDrawer, type FilterState, type SortOption } from "@/components/FilterDrawer";
import { ActiveFilters } from "@/components/ActiveFilters";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import ShopifyProductCard from "@/components/ShopifyProductCard";

const ITEMS_PER_PAGE = 24;

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<FilterState>(() => ({
    sort: (searchParams.get('sort') as SortOption) || 'newest',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    categories: searchParams.get('category')?.split(',').filter(Boolean) || [],
    sizes: searchParams.get('size')?.split(',').filter(Boolean) || [],
    colors: searchParams.get('colour')?.split(',').filter(Boolean) || [],
    onSale: searchParams.get('sale') === 'true',
  }));

  // Fetch products from Shopify
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Fetch ALL products with no default filters (increase limit to get everything)
        const shopifyProducts = await fetchProducts(250);
        setProducts(shopifyProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.sort !== 'newest') params.set('sort', filters.sort);
    if (filters.priceMin) params.set('priceMin', filters.priceMin);
    if (filters.priceMax) params.set('priceMax', filters.priceMax);
    if (filters.categories.length) params.set('category', filters.categories.join(','));
    if (filters.sizes.length) params.set('size', filters.sizes.join(','));
    if (filters.colors.length) params.set('colour', filters.colors.join(','));
    if (filters.onSale) params.set('sale', 'true');

    setSearchParams(params, { replace: true });
    setDisplayCount(ITEMS_PER_PAGE); // Reset pagination when filters change
  }, [filters, setSearchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter (only if categories are selected)
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => {
        const productTitle = p.node.title.toLowerCase();
        return filters.categories.some(cat => {
          // Map category IDs to product title patterns
          switch(cat) {
            case 'hoodie': return productTitle.includes('hoodie');
            case 'tshirt': return productTitle.includes('t-shirt') || productTitle.includes('tee');
            case 'cap': return productTitle.includes('cap');
            case 'beanie': return productTitle.includes('beanie');
            case 'puffer-jacket': return productTitle.includes('puffer');
            case 'hooded-bomber': return productTitle.includes('bomber');
            case 'joggers': return productTitle.includes('jogger') || productTitle.includes('sweatpants');
            case 'fractured-love-tshirt': return productTitle.includes('fractured');
            default: return false;
          }
        });
      });
    }

    // Apply size filter (only if sizes are selected)
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p => {
        return p.node.variants.edges.some(variant => 
          filters.sizes.some(size => 
            variant.node.selectedOptions.some(opt => 
              opt.name.toLowerCase() === 'size' && opt.value === size
            )
          )
        );
      });
    }

    // Apply color filter (only if colors are selected)
    if (filters.colors.length > 0) {
      filtered = filtered.filter(p => {
        return p.node.variants.edges.some(variant => 
          filters.colors.some(color => 
            variant.node.selectedOptions.some(opt => 
              opt.name.toLowerCase() === 'color' && opt.value.toLowerCase().includes(color)
            )
          )
        );
      });
    }

    // Apply sale filter (only if onSale is checked)
    if (filters.onSale) {
      filtered = filtered.filter(p => {
        return p.node.variants.edges.some(v => v.node.compareAtPrice);
      });
    }

    // Apply price filter (only if min or max is set)
    if (filters.priceMin || filters.priceMax) {
      const minPrice = filters.priceMin ? parseFloat(filters.priceMin) : 0;
      const maxPrice = filters.priceMax ? parseFloat(filters.priceMax) : Infinity;
      filtered = filtered.filter(p => {
        const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Sort products
    switch (filters.sort) {
      case 'price-high':
        filtered.sort((a, b) => 
          parseFloat(b.node.priceRange.minVariantPrice.amount) - 
          parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case 'price-low':
        filtered.sort((a, b) => 
          parseFloat(a.node.priceRange.minVariantPrice.amount) - 
          parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case 'popular':
      case 'newest':
      default:
        // Keep API order
        break;
    }

    return filtered;
  }, [products, filters]);

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredProducts.length));
  };

  const handleClearAll = () => {
    setFilters({
      sort: 'newest',
      priceMin: '',
      priceMax: '',
      categories: [],
      sizes: [],
      colors: [],
      onSale: false,
    });
  };

  const handleRemoveFilter = (key: keyof FilterState, value?: string) => {
    if (key === 'categories' || key === 'sizes' || key === 'colors') {
      setFilters(prev => ({
        ...prev,
        [key]: prev[key].filter(v => v !== value),
      }));
    } else if (key === 'onSale') {
      setFilters(prev => ({ ...prev, onSale: false }));
    } else {
      setFilters(prev => ({ ...prev, [key]: '' }));
    }
  };

  return (
    <>
      <ShopPageLayout
        title="Shop All"
        description="Explore every Anti-Love piece in one place — from new drops to iconic staples."
      >
        {/* Filter Button */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted-foreground">
            {loading ? 'Loading...' : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`}
          </p>
          <Button
            onClick={() => setDrawerOpen(true)}
            variant="outline"
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Active Filters */}
        <ActiveFilters
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAll}
        />

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              No products found. Try adjusting filters.
            </p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedProducts.map((product, index) => (
                <ShopifyProductCard
                  key={product.node.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={handleLoadMore}
                  size="lg"
                  variant="outline"
                  className="min-w-[200px]"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </ShopPageLayout>

      {/* Filter Drawer */}
      <FilterDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        filters={filters}
        onFiltersChange={setFilters}
        onClearAll={handleClearAll}
      />
    </>
  );
};

export default Shop;
