import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Heart, 
  Settings, 
  LogOut, 
  ChevronRight, 
  TrendingUp, 
  Users, 
  CreditCard,
  Search,
  Bell,
  Menu,
  X,
  User as UserIcon
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS, PROJECTS } from '../mockData';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import ProductCard from '../components/ProductCard';
import Login from './Login';

const Dashboard = () => {
  const { user, logout, theme, toggleTheme } = useAppContext();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const location = useLocation();

  if (!user && location.pathname !== '/dashboard/login') {
    return <Navigate to="/dashboard/login" />;
  }

  if (location.pathname === '/dashboard/login') {
    return <Login />;
  }

  const sidebarLinks = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Orders', path: '/dashboard/orders', icon: Package },
    { name: 'Wishlist', path: '/dashboard/wishlist', icon: Heart },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-bold text-sm">{user?.name}</div>
          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Pro Maker</div>
        </div>
      </div>

      <nav className="flex-grow space-y-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setIsMobileSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              location.pathname === link.path 
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                : "text-[var(--text-muted)] hover:bg-[var(--section)]"
            )}
          >
            <link.icon size={18} />
            {link.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all mt-auto"
      >
        <LogOut size={18} />
        Logout
      </button>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[var(--section)]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-[var(--card)] border-r border-[var(--border)] p-6 fixed h-screen z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-[var(--card)] border-r border-[var(--border)] p-6 z-50 lg:hidden flex flex-col"
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 text-[var(--text-muted)]">
                  <X size={24} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow lg:ml-72 p-6 md:p-12">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[var(--text-muted)]"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-2xl font-display font-bold">
              {sidebarLinks.find(l => l.path === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="p-2 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[var(--text-muted)] relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--card)]" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

const Overview = () => {
  const stats = [
    { name: 'Total Spent', value: '$1,240.50', icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Active Orders', value: '3', icon: Package, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { name: 'Wishlist Items', value: '12', icon: Heart, color: 'text-red-500', bg: 'bg-red-500/10' },
    { name: 'Projects Saved', value: '5', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
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
    <div className="space-y-12">
      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <motion.div variants={item} key={stat.name} className="card-premium p-6 flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg, stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest">{stat.name}</div>
              <div className="text-xl font-bold">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent Orders</h3>
            <Link to="/dashboard/orders" className="text-sm text-blue-500 font-bold">View All</Link>
          </div>
          <div className="card-premium overflow-hidden p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--section)] text-[var(--text-muted)] text-xs uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { id: '#PT-9283', date: 'Oct 12, 2026', status: 'Shipped', total: '$85.20' },
                  { id: '#PT-9281', date: 'Oct 10, 2026', status: 'Delivered', total: '$142.00' },
                  { id: '#PT-9275', date: 'Oct 05, 2026', status: 'Delivered', total: '$38.50' },
                ].map((order) => (
                  <tr key={order.id} className="border-t border-[var(--border)] hover:bg-[var(--section)] transition-colors">
                    <td className="px-6 py-4 font-bold">{order.id}</td>
                    <td className="px-6 py-4 text-[var(--text-muted)]">{order.date}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        order.status === 'Shipped' ? "bg-blue-500/10 text-blue-500" : "bg-green-500/10 text-green-500"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">{order.total}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-[var(--border)] rounded-lg transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recommended for You */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-bold">Recommended</h3>
          <div className="space-y-4">
            {PRODUCTS.slice(0, 3).map((product) => (
              <div key={product.id} className="card-premium p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[var(--section)] shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="font-bold text-sm truncate">{product.name}</div>
                  <div className="text-xs text-blue-500 font-bold">${product.price.toFixed(2)}</div>
                </div>
                <button className="p-2 hover:bg-[var(--section)] rounded-lg text-blue-500 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Orders = () => (
  <div className="card-premium p-12 text-center">
    <Package size={48} className="mx-auto mb-6 text-[var(--text-muted)]" />
    <h3 className="text-xl font-bold mb-2">No orders yet</h3>
    <p className="text-[var(--text-muted)] mb-8">You haven't placed any orders yet. Start exploring our marketplace!</p>
    <Link to="/marketplace" className="btn-primary inline-flex">Shop Marketplace</Link>
  </div>
);

const Wishlist = () => {
  const { wishlist } = useAppContext();
  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {wishlistedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const SettingsPage = () => (
  <div className="max-w-2xl space-y-12">
    <section className="space-y-6">
      <h3 className="text-xl font-bold">Profile Settings</h3>
      <div className="card-premium space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
          <button className="btn-secondary text-sm">Change Avatar</button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Full Name</label>
            <input type="text" defaultValue="John Doe" className="w-full px-4 py-2 bg-[var(--section)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-blue-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Email Address</label>
            <input type="email" defaultValue="john@example.com" className="w-full px-4 py-2 bg-[var(--section)] border border-[var(--border)] rounded-xl focus:outline-none focus:border-blue-500" />
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-6">
      <h3 className="text-xl font-bold">Preferences</h3>
      <div className="card-premium space-y-4">
        <div className="flex items-center justify-between p-4 bg-[var(--section)] rounded-xl">
          <div>
            <div className="font-bold text-sm">Email Notifications</div>
            <div className="text-xs text-[var(--text-muted)]">Receive updates about your orders and projects.</div>
          </div>
          <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-[var(--section)] rounded-xl">
          <div>
            <div className="font-bold text-sm">Two-Factor Authentication</div>
            <div className="text-xs text-[var(--text-muted)]">Add an extra layer of security to your account.</div>
          </div>
          <div className="w-12 h-6 bg-[var(--border)] rounded-full relative cursor-pointer">
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </section>

    <div className="flex justify-end gap-4">
      <button className="btn-secondary">Cancel</button>
      <button className="btn-primary">Save Changes</button>
    </div>
  </div>
);

export default Dashboard;
