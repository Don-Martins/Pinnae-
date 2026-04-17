import React from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Bookmark, 
  Package, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useDashboardContext } from '../../../context/DashboardContext';
import { useAppContext } from '../../../context/AppContext';
import { cn } from '../../../lib/utils';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const BuyerOverview = () => {
  const { products, projects, orders } = useDashboardContext();
  const { user } = useAppContext();

  const buyerOrders = orders.filter(o => o.userId === user?.id);
  const wishlistItems = products.filter(p => user?.wishlist.includes(p.id));
  const savedProjects = projects.filter(p => user?.savedProjects.includes(p.id));

  const stats = [
    { 
      name: 'My Orders', 
      value: buyerOrders.length.toString(), 
      icon: ShoppingCart,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    { 
      name: 'Wishlist', 
      value: wishlistItems.length.toString(), 
      icon: Heart,
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    },
    { 
      name: 'Saved Projects', 
      value: savedProjects.length.toString(), 
      icon: Bookmark,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    { 
      name: 'Active Tracking', 
      value: buyerOrders.filter(o => o.status !== 'Delivered').length.toString(), 
      icon: Package,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Welcome, {user?.name}!</h1>
          <p className="text-[var(--text-muted)] mt-1">Here's what you've been working on lately.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="btn-primary flex items-center gap-2">
            Explore Market
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <motion.div 
            variants={item}
            key={stat.name} 
            className="card-premium p-6 group hover:translate-y-[-4px] transition-all"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg, stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest mb-1">{stat.name}</div>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Latest Orders</h3>
            <button className="text-sm text-blue-500 font-bold hover:underline">See all activity</button>
          </div>
          <div className="space-y-4">
            {buyerOrders.length > 0 ? (
              buyerOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="card-premium p-5 flex items-center justify-between group hover:border-blue-500/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Package size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{order.id}</div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${
                        order.status === 'Delivered' ? 'text-green-500' : 'text-blue-500'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">${order.total.toFixed(2)}</div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-1">{order.date}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card-premium p-10 text-center text-[var(--text-muted)] italic">
                No orders yet. Start your tech journey!
              </div>
            )}
          </div>
        </div>

        {/* My Wishlist Preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">From My Wishlist</h3>
            <button className="text-sm text-blue-500 font-bold hover:underline italic">Show Full List</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wishlistItems.length > 0 ? (
              wishlistItems.slice(0, 4).map((product) => (
                <div key={product.id} className="card-premium p-4 flex items-center gap-4 group cursor-pointer hover:border-red-500/20">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[var(--section)] shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs truncate">{product.name}</div>
                    <div className="text-blue-500 font-bold text-xs mt-1">${product.price.toFixed(2)}</div>
                    <button className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-2 flex items-center gap-1 group/btn">
                      Add to Cart <ArrowRight size={10} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 card-premium p-10 text-center text-[var(--text-muted)] italic">
                Your wishlist is empty. Discover awesome components!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerOverview;
