import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { marketplaceService } from '../services/marketplaceService';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import Skeleton from '../components/Skeleton';
import { Product } from '../types';

const Marketplace = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [sortBy, setSortBy] = useState('Featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    marketplaceService.getCategories().then(data => {
      if (Array.isArray(data)) {
        setCategories(['All', ...data.map((c: any) => c.name)]);
      }
    }).catch(console.error);
  }, []);

  // Fetch products
  useEffect(() => {
    setIsLoading(true);
    const params: any = {};
    if (selectedCategory !== 'All') {
      params.category = selectedCategory.toLowerCase();
    }
    if (searchQuery) {
      params.search = searchQuery;
    }
    
    // Map sortBy to backend expected values
    if (sortBy === 'Price: Low to High') params.sort = 'price_low';
    if (sortBy === 'Price: High to Low') params.sort = 'price_high';
    if (sortBy === 'Rating') params.sort = 'rating';

    marketplaceService.getProducts(params).then(data => {
      // Laravel pagination returns an object with a 'data' array
      if (data && data.data) {
        const mappedProducts = data.data.map((p: any) => ({
          id: String(p.id),
          name: p.name,
          description: p.description,
          price: Number(p.price),
          category: p.category ? p.category.name : 'Uncategorized',
          image: p.image_url,
          rating: p.rating || 0,
          reviews: p.reviews_count || 0,
          stock: p.stock
        }));
        setProducts(mappedProducts);
      }
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const filteredProducts = products; // Backend handles filtering

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold mb-4">Marketplace</h1>
          <p className="text-[var(--text-muted)]">Browse our collection of premium electronics and components.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="p-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl md:hidden">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block space-y-8">
          <div>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Filter size={18} className="text-blue-500" />
              Categories
            </h3>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "text-left px-4 py-2 rounded-xl text-sm transition-all",
                    selectedCategory === category 
                      ? "bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/20" 
                      : "text-[var(--text-muted)] hover:bg-[var(--section)]"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-blue-500" />
              Price Range
            </h3>
            <div className="px-2">
              <input type="range" className="w-full accent-blue-500" />
              <div className="flex justify-between text-xs text-[var(--text-muted)] mt-2">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <h4 className="font-bold mb-2">Need Help?</h4>
            <p className="text-xs text-white/80 mb-4">Not sure which component you need for your project?</p>
            <button className="w-full py-2 bg-white text-blue-600 text-xs font-bold rounded-xl hover:bg-gray-100 transition-colors">
              Chat with Engineer
            </button>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
            <div className="text-sm text-[var(--text-muted)]">
              Showing <span className="font-bold text-[var(--text)]">{filteredProducts.length}</span> products
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-1 bg-[var(--section)] rounded-xl border border-[var(--border)]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-[var(--card)] shadow-sm text-blue-500" : "text-[var(--text-muted)]")}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-[var(--card)] shadow-sm text-blue-500" : "text-[var(--text-muted)]")}
                >
                  <List size={18} />
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--section)] border border-[var(--border)] rounded-xl text-sm font-medium">
                  Sort by: {sortBy}
                  <ChevronDown size={16} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                  {['Featured', 'Price: Low to High', 'Price: High to Low', 'Rating'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-[var(--section)] transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className={cn(
                "grid gap-8",
                viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              )}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="card-premium h-[400px] flex flex-col gap-4">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between mt-auto">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-10 w-10" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                layout
                className={cn(
                  "grid gap-8",
                  viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                )}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-[var(--section)] rounded-full flex items-center justify-center text-[var(--text-muted)] mb-6">
                  <Search size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-[var(--text-muted)]">Try adjusting your filters or search query.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-6 text-blue-500 font-bold"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
