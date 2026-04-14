import React from 'react';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

const AdminOverview = () => {
  const { products, orders, users } = useAdminContext();

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  
  const stats = [
    { 
      name: 'Total Revenue', 
      value: `$${totalRevenue.toLocaleString()}`, 
      change: '+12.5%', 
      isPositive: true,
      icon: TrendingUp,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    { 
      name: 'Total Products', 
      value: products.length.toString(), 
      change: '+4', 
      isPositive: true,
      icon: Package,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    { 
      name: 'Active Orders', 
      value: orders.filter(o => o.status !== 'Delivered').length.toString(), 
      change: '-2', 
      isPositive: false,
      icon: ShoppingCart,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    },
    { 
      name: 'Total Users', 
      value: users.length.toString(), 
      change: '+18%', 
      isPositive: true,
      icon: Users,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
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
          <h1 className="text-3xl font-display font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-[var(--text-muted)] mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm font-medium">
            Last 30 Days
          </div>
          <button className="btn-primary flex items-center gap-2">
            Download Report
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
                {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
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
        {/* Recent Orders Table */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent Orders</h3>
            <button className="text-sm text-blue-500 font-bold hover:underline">View All Orders</button>
          </div>
          <div className="card-premium p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--section)] border-b border-[var(--border)]">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Date</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-[var(--section)] transition-colors group">
                      <td className="px-6 py-4 font-mono text-sm font-medium">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 text-xs font-bold">
                            {order.userName.charAt(0)}
                          </div>
                          <span className="font-medium text-sm">{order.userName}</span>
                        </div>
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
                      <td className="px-6 py-4 text-sm text-[var(--text-muted)]">{order.date}</td>
                      <td className="px-6 py-4 text-right font-bold text-sm">${order.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Top Products</h3>
            <button className="p-2 hover:bg-[var(--section)] rounded-lg text-[var(--text-muted)]">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="space-y-4">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="card-premium p-4 flex items-center gap-4 group hover:border-blue-500/30 transition-all">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[var(--section)] shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="font-bold text-sm truncate">{product.name}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">{product.category}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-grow h-1.5 bg-[var(--section)] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${Math.random() * 60 + 40}%` }} 
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[var(--text-muted)]">85%</span>
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

export default AdminOverview;
