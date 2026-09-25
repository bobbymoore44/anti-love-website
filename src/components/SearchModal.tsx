import { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, type ShopifyProduct } from '@/lib/shopify';

type SearchItem = {
  type: 'product' | 'collection';
  title: string;
  handle: string;
  path: string;
  image: string;
  price?: number;
  badge?: string;
  colors?: string[];
  availability: 'in' | 'out';
};

const RECENT_SEARCHES_KEY = 'al_recent_searches';
const MAX_RECENT = 5;

const collectionsData = [
  { name: 'Anti-Love Basics', handle: 'basics', path: '/collections/basics', image: '', count: 20 },
  { name: 'Tracksuits', handle: 'tracksuits', path: '/collections/tracksuits', count: 8 },
  { name: 'Fractured Love', handle: 'fractured-love', path: '/collections/fractured-love', count: 2 },
  { name: 'Outerwear', handle: 'outerwear', path: '/collections/outerwear', count: 6 },
];

export const SearchModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'collections'>('products');
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
        setRecentSearches(stored ? JSON.parse(stored) : []);
      } catch {}
      
      // Fetch Shopify products
      setIsLoadingProducts(true);
      fetchProducts(100)
        .then((products) => {
          setShopifyProducts(products);
          setIsLoadingProducts(false);
        })
        .catch((error) => {
          console.error('Failed to fetch products for search:', error);
          setIsLoadingProducts(false);
        });
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setActiveTab('products');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  const saveRecentSearch = useCallback((q: string) => {
    if (!q.trim()) return;
    setRecentSearches((prev) => {
      const updated = [q, ...prev.filter((s) => s !== q)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const searchIndex = useMemo(() => {
    const items: SearchItem[] = [];
    
    // Convert Shopify products to SearchItems
    shopifyProducts.forEach((product) => {
      const { node } = product;
      const price = parseFloat(node.priceRange.minVariantPrice.amount);
      const image = node.images.edges[0]?.node.url || '';
      
      // Determine badge
      let badge: string | undefined;
      if (node.tags.includes('pre-sale')) {
        badge = 'PRE-SALE';
      } else if (node.tags.includes('creative-collection')) {
        badge = 'CREATIVE COLLECTION';
      }
      
      items.push({
        type: 'product',
        title: node.title,
        handle: node.handle,
        path: `/product/${node.handle}`,
        image,
        price,
        badge,
        availability: 'in',
      });
    });

    // Add collections
    collectionsData.forEach((col) => {
      items.push({
        type: 'collection',
        title: col.name,
        handle: col.handle,
        path: col.path,
        image: col.image,
        availability: 'in',
      });
    });

    return items;
  }, [shopifyProducts]);

  const results = useMemo(() => {
    if (!query.trim()) return { products: [], collections: [] };

    const q = query.toLowerCase();
    const products = searchIndex.filter(
      (item) => item.type === 'product' && (
        item.title.toLowerCase().includes(q) ||
        item.badge?.toLowerCase().includes(q)
      )
    );
    
    const collections = searchIndex.filter(
      (item) => item.type === 'collection' && item.title.toLowerCase().includes(q)
    );

    return { products, collections };
  }, [query, searchIndex]);

  const handleResultClick = (item: SearchItem) => {
    if (query.trim()) {
      saveRecentSearch(query);
    }
    onOpenChange(false);
    navigate(item.path);
  };

  const handleRecentClick = (q: string) => {
    setQuery(q);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query);
      onOpenChange(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center animate-fade-in"
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(30px)',
      }}
      onClick={handleClose}
    >
      {/* Search Box */}
      <div 
        className="w-[90%] md:w-[60%] max-w-[720px] flex flex-col gap-0 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Container */}
        <form onSubmit={handleSubmit}>
          <div 
            className="h-16 flex items-center gap-0 transition-all duration-300 group"
            style={{
              background: 'rgba(20, 20, 20, 0.8)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '14px',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.05), inset 0 0 8px rgba(255, 255, 255, 0.05)',
            }}
          >
            <div className="pl-5 pr-3 flex items-center">
              <Search 
                className="w-5 h-5 transition-colors duration-200"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              />
            </div>
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products and collections…"
              autoFocus
              className="flex-1 bg-transparent border-0 outline-none text-base"
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                fontWeight: 400,
                letterSpacing: '0.5px',
                caretColor: '#fff',
              }}
            />
            
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="pr-5 pl-3 transition-colors duration-200 hover:text-[#ff3b3b]"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>

        {/* Results Container */}
        {(query.trim() || recentSearches.length > 0) && (
          <div 
            className="mt-4 max-h-[500px] overflow-y-auto rounded-2xl"
            style={{
              background: 'rgba(20, 20, 20, 0.85)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)',
            }}
          >
            {!query.trim() && recentSearches.length > 0 && (
              <div className="p-6">
                <h3 className="text-xs font-bold mb-4 uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Recent Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleRecentClick(q)}
                      className="px-3 py-1.5 text-sm rounded-lg transition-all duration-200"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.8)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query.trim() && (
              <>
                {/* Tabs */}
                <div className="flex border-b px-6 pt-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="pb-3 px-4 text-sm font-medium transition-all duration-200 relative"
                    style={{
                      color: activeTab === 'products' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    Products ({results.products.length})
                    {activeTab === 'products' && (
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: 'rgba(255, 255, 255, 0.9)' }}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('collections')}
                    className="pb-3 px-4 text-sm font-medium transition-all duration-200 relative"
                    style={{
                      color: activeTab === 'collections' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    Collections ({results.collections.length})
                    {activeTab === 'collections' && (
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: 'rgba(255, 255, 255, 0.9)' }}
                      />
                    )}
                  </button>
                </div>

                {/* Products Tab */}
                {activeTab === 'products' && (
                  <div className="p-6">
                    {isLoadingProducts ? (
                      <p className="text-center py-8" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        Loading products...
                      </p>
                    ) : results.products.length === 0 ? (
                      <p className="text-center py-8" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        No products found for "{query}". Try fewer keywords.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {results.products.slice(0, 6).map((item) => (
                          <button
                            key={item.handle}
                            onClick={() => handleResultClick(item)}
                            className="w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 text-left"
                            style={{
                              background: 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <div 
                              className="w-[60px] h-[60px] rounded-md overflow-hidden flex-shrink-0"
                              style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                              }}
                            >
                              <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-semibold" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                  ${item.price?.toFixed(2)}
                                </span>
                                {item.badge && (
                                  <span 
                                    className="text-xs px-2 py-0.5 rounded font-medium"
                                    style={{
                                      background: 'rgba(255, 255, 255, 0.1)',
                                      color: 'rgba(255, 255, 255, 0.8)',
                                    }}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Collections Tab */}
                {activeTab === 'collections' && (
                  <div className="p-6">
                    {results.collections.length === 0 ? (
                      <p className="text-center py-8" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        No collections found for "{query}".
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {results.collections.map((item) => (
                          <button
                            key={item.handle}
                            onClick={() => handleResultClick(item)}
                            className="w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-200 text-left"
                            style={{
                              background: 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <div className="flex-1">
                              <h4 className="font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                {item.title}
                              </h4>
                              <p className="text-sm mt-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                View collection
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
