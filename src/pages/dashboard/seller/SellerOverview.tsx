import React from 'react';
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { useDashboardContext } from '../../../context/DashboardContext';
import { useAppContext } from '../../../context/AppContext';
import { cn } from '../../../lib/utils';
import { motion } from 'motion/react';

const SellerOverview = () => {
  const { products, orders } = useDashboardContext();
  const { user } = useAppContext();

  const sellerProducts = products.filter(p => p.sellerId === user?.id);
  const sellerProductIds = sellerProducts.map(p => p.id);
  
  const sellerOrders = orders.filter(order => 
    order.items.some(item => sellerProductIds.includes(item.productId))
  );

  const sellerRevenue = sellerOrders.reduce((acc, o) => {
    const itemsFromSeller = o.items.filter(item => sellerProductIds.includes(item.productId));
    const itemsTotal = itemsFromSeller.reduce((sum, item) => {
      const product = sellerProducts.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
    return acc + itemsTotal;
  }, 0);

  const stats = [
    { 
      name: 'Total Revenue', 
      value: `$${sellerRevenue.toLocaleString()}`, 
      change: '+15.2%', 
      isPositive: true,
      icon: DollarSign,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    { 
      name: 'My Products', 
      value: sellerProducts.length.toString(), 
      change: '+2', 
      isPositive: true,
      icon: Package,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    { 
      name: 'Product Sales', 
      value: sellerOrders.length.toString(), 
      change: '+8%', 
      isPositive: true,
      icon: ShoppingCart,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    { 
      name: 'Conversion', 
      value: '4.2%', 
      change: '-0.5%', 
      isPositive: false,
      icon: TrendingUp,
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Seller Dashboard</h1>
          <p className="text-[var(--text-muted)] mt-1">Manage your shop, products, and track your performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">Export Sales</button>
          <button className="btn-primary flex items-center gap-2">
            View Shop
          </button>
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
            className="card-premium p-6 group hover:border-blue-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
                stat.isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
              )}>
                {stat.isPositive ? <ArrowUpRight size={14} /> : <div className="rotate-90"> <ArrowUpRight size={14} /> </div>}
                {stat.change}
              </div>
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest mb-1">{stat.name}</div>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Sales Table */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent Product Interest</h3>
            <button className="text-sm text-blue-500 font-bold hover:underline">View Sales History</button>
          </div>
          <div className="card-premium p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--section)] border-b border-[var(--border)]">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Order</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] text-right">My Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {sellerOrders.slice(0, 5).map((order) => {
                    const itemsFromSeller = order.items.filter(item => sellerProductIds.includes(item.productId));
                    const share = itemsFromSeller.reduce((sum, item) => {
                      const product = sellerProducts.find(p => p.id === item.productId);
                      return sum + (product?.price || 0) * item.quantity;
                    }, 0);
                    
                    return (
                      <tr key={order.id} className="hover:bg-[var(--section)] transition-colors group">
                        <td className="px-6 py-4 font-mono text-sm font-medium">{order.id}</td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-sm">{order.userName}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            order.status === 'Delivered' ? "bg-green-500/10 text-green-500" :
                            order.status === 'Shipped' ? "bg-blue-500/10 text-blue-500" :
                            order.status === 'Paid' ? "bg-purple-500/10 text-purple-500" :
                            "bg-orange-500/10 text-orange-500"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-sm text-green-500">+${share.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* My Best Sellers */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">My Best Sellers</h3>
            <button className="text-sm text-blue-500 font-bold hover:underline">Manage All</button>
          </div>
          <div className="space-y-4">
            {sellerProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="card-premium p-4 flex items-center gap-4 group hover:border-blue-500/30 transition-all">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[var(--section)] shrink-0 border border-[var(--border)]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="font-bold text-sm truncate">{product.name}</div>
                  <div className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1">${product.price.toFixed(2)}</div>
                  <div className="flex items-center justify-between mt-3 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    <span>Stock: {product.stock}</span>
                    <span className="text-green-500">Popular</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;
