import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useAppContext();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="card-premium group relative flex flex-col h-full"
    >
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className={cn(
          "absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300",
          isWishlisted 
            ? "bg-red-500 text-white" 
            : "bg-white/80 dark:bg-black/80 text-[var(--text-muted)] hover:text-red-500"
        )}
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-[var(--section)]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <div className="p-3 bg-white dark:bg-gray-900 rounded-full text-blue-500 shadow-xl scale-90 group-hover:scale-100 transition-transform">
            <Eye size={20} />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-1 rounded">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`} className="text-lg font-display font-bold mb-2 hover:text-blue-500 transition-colors line-clamp-1">
          {product.name}
        </Link>
        
        <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product.id)}
            className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors active:scale-90"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
