import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { FAMILIES, COLOR_ORDER } from '@/lib/catalog';
import { Search } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [visibleCount, setVisibleCount] = useState(30);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setVisibleCount(30);
  }, [query]);

  const allProducts = useMemo(() => {
    const products: any[] = [];
    Object.values(FAMILIES).forEach((family) => {
      family.variants.forEach((variant) => {
        const colorLabel = COLOR_ORDER.find((c) => c.key === variant.color)?.label || variant.name;
        products.push({
          family,
          variant,
          colorLabel,
          searchText: `${family.title} ${colorLabel} ${family.collectionTags?.join(' ') || ''} ${variant.color}`.toLowerCase(),
        });
      });
    });
    return products;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return allProducts;
    const q = query.toLowerCase();
    return allProducts.filter((p) => p.searchText.includes(q));
  }, [query, allProducts]);

  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-12 max-w-[1400px]">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 uppercase tracking-tight">
            Search Results
          </h1>
          {query && (
            <p className="text-muted-foreground text-lg">
              {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
            </p>
          )}
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="w-20 h-20 text-muted-foreground mb-6" />
            <h2 className="text-2xl font-semibold mb-3">No results found</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              No products found for "{query}". Try different keywords or browse all products.
            </p>
            <Link 
              to="/shop"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleResults.map((product) => (
                <ProductCard
                  key={`${product.family.id}-${product.variant.color}`}
                  family={product.family}
                  color={product.variant.color}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 30)}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors uppercase tracking-wider"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
