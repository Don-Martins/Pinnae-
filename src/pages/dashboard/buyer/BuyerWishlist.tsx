import React from 'react';
import { Heart } from 'lucide-react';
import { useDashboardContext } from '../../../context/DashboardContext';
import { useAppContext } from '../../../context/AppContext';
import ProductCard from '../../../components/ProductCard';
import { Link } from 'react-router-dom';

const BuyerWishlist = () => {
  const { products } = useDashboardContext();
  const { user } = useAppContext();

  const wishlistedProducts = products.filter(p => user?.wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="card-premium p-12 text-center">
        <Heart size={48} className="mx-auto mb-6 text-[var(--text-muted)]" />
        <h3 className="text-xl font-bold mb-2">Your wishlist is empty</h3>
        <p className="text-[var(--text-muted)] mb-8">Save products you're interested in to view them later.</p>
        <Link to="/marketplace" className="btn-primary inline-flex">Explore Products</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">My Wishlist</h1>
        <p className="text-[var(--text-muted)] mt-1">Products you've saved for later.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BuyerWishlist;
