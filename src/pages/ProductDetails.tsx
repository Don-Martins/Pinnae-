import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Shield, Truck, RotateCcw, ChevronRight, Minus, Plus } from 'lucide-react';
import { PRODUCTS } from '../mockData';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  
  const product = PRODUCTS.find(p => p.id === id);
  const isWishlisted = wishlist.includes(id || '');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/marketplace" className="text-blue-500 font-bold">Back to Marketplace</Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-12">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <ChevronRight size={14} />
        <Link to="/marketplace" className="hover:text-blue-500">Marketplace</Link>
        <ChevronRight size={14} />
        <span className="text-[var(--text)] font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Image Gallery */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-[32px] overflow-hidden bg-[var(--section)] border border-[var(--border)]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-[var(--section)] border border-[var(--border)] cursor-pointer hover:border-blue-500 transition-colors">
                <img src={`https://picsum.photos/seed/${product.id}-${i}/200/200`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={18} fill="currentColor" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-[var(--text-muted)] text-sm font-normal">({product.reviews} reviews)</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">{product.name}</h1>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="text-4xl font-bold mb-10">${product.price.toFixed(2)}</div>

          <div className="flex flex-col gap-6 mb-12">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 p-2 bg-[var(--section)] border border-[var(--border)] rounded-2xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--border)] transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--border)] transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                onClick={() => addToCart(product.id, quantity)}
                className="btn-primary flex-grow flex items-center justify-center gap-3 py-4"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-300",
                  isWishlisted 
                    ? "bg-red-500 border-red-500 text-white" 
                    : "border-[var(--border)] text-[var(--text-muted)] hover:text-red-500 hover:border-red-500"
                )}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>
            
            <div className="text-sm text-[var(--text-muted)] flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", product.stock > 0 ? "bg-green-500" : "bg-red-500")} />
              {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--section)] rounded-xl flex items-center justify-center text-blue-500">
                <Shield size={20} />
              </div>
              <div className="text-xs font-medium">1 Year Warranty</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--section)] rounded-xl flex items-center justify-center text-blue-500">
                <Truck size={20} />
              </div>
              <div className="text-xs font-medium">Fast Shipping</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--section)] rounded-xl flex items-center justify-center text-blue-500">
                <RotateCcw size={20} />
              </div>
              <div className="text-xs font-medium">30-Day Returns</div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-display font-bold mb-8">Related Components</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
